import { User } from '@prisma/client';
import { db, pgp } from '../index';
import {
  UserByLocationAndLanguages,
  CreateUserPayload,
  CreateUserGithubLanguagePayload,
  ValidatedListUserArgs,
} from '../../interfaces/user.interface';

const { ColumnSet, insert } = pgp.helpers;

export const insertUser = async (user: CreateUserPayload): Promise<User> => {
  const columnSet = new ColumnSet(
    ['github_id', 'name', 'email', 'username', 'public_repos', 'location'],
    { table: 'users' },
  );
  const query = insert(user, columnSet) + ' RETURNING *;';
  return db.one(query);
};

export const bulkInsertLanguages = async (
  userLanguagePayload: CreateUserGithubLanguagePayload[],
): Promise<void> => {
  const columnSet = new ColumnSet(['user_id', 'language'], {
    table: 'languages',
  });

  return db.tx(async (t: any) => {
    const query = insert(userLanguagePayload, columnSet);
    await t.none(query);
  });
};

export const getUsersByLocationAndLanguages = ({
  location,
  languages = [],
}: ValidatedListUserArgs): Promise<UserByLocationAndLanguages[]> => {
  const query = `
    SELECT u.id, u.github_id, u.name, u.email, u.public_repos, u.location, ARRAY_AGG(l.language) AS languages
    FROM users u
    LEFT JOIN languages l ON u.id = l.user_id
    WHERE 
      ${location ? `LOWER(u.location) = LOWER($[location])` : `TRUE`}
      AND
      ${languages.length > 0 ? `l.language iLike ANY($[languages])` : `TRUE`}
    GROUP BY u.id
  `;
  return db.any(query, { location, languages });
};

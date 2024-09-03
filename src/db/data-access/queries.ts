// const { sql } = require('pg-promise');
import { db, pgp } from '../index';

const { ColumnSet, insert } = pgp.helpers;

// export const insertUser = async (user: any) => {
//   const query = `
//     INSERT INTO users (github_id, name, email, public_repos, location, url)
//     VALUES ($[id], $[name], $[email], $[public_repos], $[location], $[url])
//     ON CONFLICT (github_id) DO NOTHING
//     RETURNING id;
//   `;
//   return db.oneOrNone(query, user);
// };

export const insertUser = async (user: any) => {
  const columnSet = new ColumnSet(
    ['github_id', 'name', 'email', 'username', 'public_repos', 'location'],
    { table: 'users' },
  );
  const query = insert(user, columnSet) + ' RETURNING *;';
  return db.one(query);
};

// export const bulkInsertLanguages = async (language: string, userId: number) => {
//   const query = `
//     INSERT INTO languages (user_id, language)
//     VALUES ($[userId], $[language])
//     ON CONFLICT DO NOTHING;
//   `;
//   return db.none(query, { userId, language });
// };

export const bulkInsertLanguages = async (data: any[]) => {
  const columnSet = new ColumnSet(['user_id', 'language'], {
    table: 'languages',
  });

  return db.tx(async (t: any) => {
    const query = insert(data, columnSet);
    await t.none(query);
  });
};

// export const getAllUsers = async () => {
//   const query = 'SELECT * FROM users';
//   return db.any(query);
// };

// export const getUsersByLocation = async (location: string) => {
//   const query = `
//     SELECT * FROM users WHERE location = $[location];
//   `;
//   return db.any(query, { location });
// };

// export const getUsersByLocationAndLanguage = async (
//   location: string,
//   language: string,
// ) => {
//   const query = `
//     SELECT u.* FROM users u
//     JOIN languages l ON u.id = l.user_id
//     WHERE u.location = $[location] AND l.language = $[language];
//   `;
//   return db.any(query, { location, language });
// };

export const fetchUsersByLocationAndLanguages = ({
  location,
  languages = [],
}: {
  location?: string;
  languages: any[];
}) => {
  const query = `
    SELECT u.id, u.github_id, u.name, u.email, u.public_repos, u.location, ARRAY_AGG(l.language) AS languages
    FROM users u
    LEFT JOIN languages l ON u.id = l.user_id
    WHERE 
      ${location ? `LOWER(u.location) = LOWER($[location])` : `TRUE`} AND
      ${languages.length > 0 ? `l.language iLike ANY($[languages])` : `TRUE`}
    GROUP BY u.id
  `;
  return db.any(query, { location, languages });
};

// SELECT u.id, u.github_id, u.name, u.email, u.public_repos, u.location, ARRAY_AGG(l.language) AS languages
// FROM users u
// LEFT JOIN languages l ON u.id = l.user_id
// WHERE
//   ${location ? sql`u.location = ${location}` : sql`TRUE`} AND
//   ${languages.length > 0 ? sql`l.language = ANY(${languages})` : sql`TRUE`}
// GROUP BY u.id
// HAVING
//   ${languages.length > 0 ? sql`COUNT(DISTINCT l.language) = ${languages.length}` : sql`TRUE`}

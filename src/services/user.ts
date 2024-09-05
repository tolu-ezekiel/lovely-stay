import { getDataFromUrl } from '../utils/axios';
import { formatLanguagePayload } from '../utils/create-language-payload';
import { createTable } from '../utils/table';
import {
  CreateUserPayload,
  ValidatedListUserArgs,
} from '../interfaces/user.interface';
import {
  FetchGithubUserResponse,
  FetchGithubRepoResponse,
} from '../interfaces/github-api-response.interface';
import {
  insertUser,
  bulkInsertLanguages,
  getUsersByLocationAndLanguages,
} from '../db/data-access/queries';

export const fetchGitHubUser = async (username: string): Promise<void> => {
  const userResponse: FetchGithubUserResponse | null = await getDataFromUrl(
    `https://api.github.com/users/${username}`,
  );

  if (!userResponse) {
    throw new Error(`No Github user with username ${username}`);
  }

  const userPayload: CreateUserPayload = {
    github_id: userResponse.id,
    name: userResponse.name,
    email: userResponse.email,
    username: userResponse.login,
    public_repos: userResponse.public_repos,
    location: userResponse.location,
  };
  const newUser = await insertUser(userPayload);

  const githubUserRepos: FetchGithubRepoResponse[] | null =
    await getDataFromUrl(`https://api.github.com/users/${username}/repos`);

  if (githubUserRepos?.length && githubUserRepos.length > 0) {
    const userLanguagePayload = formatLanguagePayload({
      user: newUser,
      githubUserRepos,
    });

    await bulkInsertLanguages(userLanguagePayload);
  }
};

export const listUserByLocationAndLanguages = async ({
  location,
  languages,
}: ValidatedListUserArgs): Promise<string> => {
  const userRecords = await getUsersByLocationAndLanguages({
    location,
    languages,
  });

  const head = [
    'id',
    'github_id',
    'name',
    'username',
    'email',
    'public_repos',
    'location',
    'languages',
  ];
  const colWidths = [5, 12, 12, 15, 15, 15, 20, 25];

  const table = createTable({ records: userRecords, head, colWidths });
  return table;
};

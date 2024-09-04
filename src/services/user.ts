import * as Table from 'cli-table3';
import { getDataFromUrl } from '../utils/axios';
import { formatLanguagePayload } from '../utils/create-language-payload';
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
  console.log('--111---userResponse-----', userResponse);

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

  console.log('--222---githubUserRepos-----', githubUserRepos);

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
  console.log('=========', location, languages);
  const user = await getUsersByLocationAndLanguages({ location, languages });
  console.log('----a----', user);

  const table = new Table({
    head: [
      'id',
      'github_id',
      'name',
      'email',
      'public_repos',
      'location',
      'languages',
    ],
    colWidths: [5, 10, 15, 20, 20, 20, 40],
    wordWrap: true,
  });

  const valueArrays: string[][] = user.map((item: any) =>
    Object.values(item).map((value) => {
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (typeof value === 'string') {
        return value;
      } else {
        return String(value);
      }
    }),
  );

  console.log('----valueArrays----', valueArrays);
  table.push(...valueArrays);
  return table.toString();
};

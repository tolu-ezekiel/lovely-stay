import * as Table from 'cli-table3';

import * as R from 'ramda';
import { insertUser, bulkInsertLanguages, getAllUsers } from '../db/data-access/queries';
import { getDataFromUrl }  from '../utils/axios';

export const fetchGitHubUser = async (username: string): Promise<void> => {
  const userResponse: any = await getDataFromUrl(`https://api.github.com/users/${username}`);
  console.log('--111---fetchGitHubUser-----', userResponse);

  if (!userResponse) {
    console.log(`No Github user with username ${username}`);
    return;
  }
  const userPayload = {
    github_id: userResponse.id,
    name: userResponse.name,
    email: userResponse.email,
    public_repos: userResponse.public_repos,
    location: userResponse.location,
  }
  const newUser = await insertUser(userPayload); // --TODO-- use try catch

  const userLanguages: any = await getDataFromUrl(`https://api.github.com/users/${username}/repos`);
  // const userLanguages = [{language:'python'}, {language:null}, {language:'html'}, {language:'python'}]
  // const cleanArray = R.reject(R.isNil, userLanguages);
  // const uniqueLanguages = R.uniq(cleanArray);

  const uniqueLanguages = R.pipe(
    R.map(R.prop('language')),
    R.reject(R.isNil),
    R.uniq
  )(userLanguages);

  const insertLanguagePayload = uniqueLanguages.map((language) => {
    return { user_id: newUser.id, language };
  });
  console.log('----insertLanguagePayload----', insertLanguagePayload);

  await bulkInsertLanguages(insertLanguagePayload);
};

// export const fetchGitHubUserRepos = async (username: string) => {
//   const reposResponse = await axios.get(
//     `https://api.github.com/users/${username}/repos` // ?page=1 per_page=// 30 per page
//   );
//   // headers: {
//   //   "X-GitHub-Api-Version":
//   //     "2022-11-28",
//   // },
//   // return reposResponse.data.map((repo: any) => repo.language).filter(Boolean);
//   return reposResponse.data;
// };

export const listAllUsers = async () => {
  const a = await getAllUsers();
  console.log('----a----', a);

  const table = new Table({
    head: ['Id', 'github_id', 'name', 'email', 'public_repos', 'location'],
    colWidths: [5, 15, 30, 30, 20, 30],
  });

  const valueArrays = a.map((item:any) => Object.values(item));
  console.log('----valueArrays----', valueArrays);
  table.push(...valueArrays);

  return table.toString();
};

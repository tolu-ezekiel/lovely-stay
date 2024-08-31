// import * as R from 'ramda';
// import {
//   insertUser,
//   insertLanguage,
//   getAllUsers,
//   getUsersByLocation,
//   getUsersByLocationAndLanguage,
// } from '../db/data-access/queries';
// import { fetchGitHubUser, fetchGitHubUserRepos } from './github';

// export const saveGitHubUser = async (username: string) => {
//   const userData = await fetchGitHubUser(username);
//   const userId = await insertUser({
//     github_id: userData.id,
//     name: userData.name,
//     location: userData.location,
//     url: userData.html_url,
//   });

//   if (userId) {
//     const languages = await fetchGitHubUserRepos(username);
//     const uniqueLanguages = R.uniq(languages);
//     await Promise.all(
//       uniqueLanguages.map((lang) => insertLanguage(lang, userId.id))
//     );
//   }
// };

// export const listAllUsers = async () => {
//   return getAllUsers();
// };

// export const listUsersByLocation = async (location: string) => {
//   return getUsersByLocation(location);
// };

// export const listUsersByLocationAndLanguage = async (
//   location: string,
//   language: string
// ) => {
//   return getUsersByLocationAndLanguage(location, language);
// };

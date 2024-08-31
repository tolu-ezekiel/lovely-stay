// import { saveGitHubUser, listAllUsers, listUsersByLocation } from './services/userService';
// import { listUsersByLocationAndLanguage } from './services/userService';

// // if no process.env.DATABASE_URL throw eror

// const args = process.argv.slice(2);

// const main = async () => {
//   const command = args[0];
//   const value = args[1];

//   switch (command) {
//     case '--fetch':
//       await saveGitHubUser(value);
//       console.log(`Fetched and saved data for user: ${value}`);
//       break;
//     case '--list':
//       const users = await listAllUsers();
//       console.log(users);
//       break;
//     case '--list-location':
//       const usersByLocation = await listUsersByLocation(value);
//       console.log(usersByLocation);
//       break;
//     case '--list-location-language':
//       const location = args[1];
//       const language = args[2];
//       const usersByLocAndLang = await listUsersByLocationAndLanguage(location, language);
//       console.log(usersByLocAndLang);
//       break;
//     default:
//       console.log('Unknown command');
//   }
// };

// main();

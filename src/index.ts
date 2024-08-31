import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchUserGithubData } from './commands/fetch';
import { listUser } from './commands/list';

yargs(hideBin(process.argv))
  .command(fetchUserGithubData)
  .command(listUser)
  // .command(listUserAndLocationCommand)
  // .command(listUserLocationAndLanguageCommand)
  // .help().argv
  .help('help')
  .parse()

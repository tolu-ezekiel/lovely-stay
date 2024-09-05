import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchGithubData } from './commands/fetch';
import { listUsers } from './commands/list';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions, prettier/prettier
yargs(hideBin(process.argv))
  .command(fetchGithubData)
  .command(listUsers)
  .help().argv;

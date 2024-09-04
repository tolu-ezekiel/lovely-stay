import { CommandModule } from 'yargs';
import { fetchGitHubUser } from '../services/user';
import { fetchGithubValidator } from '../validators/fetch.validator';
import { FetchGithubArgs } from '../interfaces/fetch.interface';

export const fetchGithubData: CommandModule<object, FetchGithubArgs> = {
  command: 'fetch',
  describe: 'Fetch user details from Github',
  builder: (yargs) => {
    return yargs
      .option('username', {
        alias: 'u',
        type: 'string',
        description: `User's Github username`,
        demandOption: true,
      })
      .check(fetchGithubValidator);
  },
  handler: async (argv: FetchGithubArgs) => {
    console.log(`Fetch Github user data for username ${argv.username} ...`);

    try {
      await fetchGitHubUser(argv.username);
      console.log('Done');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};

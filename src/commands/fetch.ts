import { CommandModule } from 'yargs';
import { fetchGitHubUser } from '../services/user';
import { fetchGithubValidator } from '../validators/fetch.validator';
import { FetchGithubArgs } from '../interfaces/user.interface';

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
    console.log(
      `Fetching Github data for username ${argv.username} U+23F3 ...`,
    );

    try {
      await fetchGitHubUser(argv.username);
      console.log('Done \u{1F389}');
    } catch (error: Error | any) {
      console.error(`U+274C ${error.message} U+274C`);
    }
  },
};

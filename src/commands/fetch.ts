import { CommandModule } from 'yargs';
import { fetchGitHubUser } from '../services/user';
import { fetchGithubValidator } from '../validators/fetch.validator';
import { FetchGithubArgs } from '../interfaces/user.interface';
import logger from '../utils/logger';

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
    logger.info(
      `Fetching Github data for username ${argv.username} \u{23F3} ...`,
    );

    try {
      await fetchGitHubUser(argv.username);
      logger.info('Done \u{1F389}');
    } catch (error: Error | any) {
      logger.error(`\u{274C} ${error.message} \u{274C}`);
    }
  },
};

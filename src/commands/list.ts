import { CommandModule } from 'yargs';
import { listUserByLocationAndLanguages } from '../services/user';
import { listUserValidator } from '../validators/list.validator';
import {
  ListUserArgs,
  ValidatedListUserArgs,
} from '../interfaces/user.interface';
import logger from '../utils/logger';

export const listUsers: CommandModule<object, ListUserArgs> = {
  command: 'list',
  describe: 'List information in the database',
  builder: (yargs) => {
    return yargs
      .option('location', {
        alias: 'l',
        type: 'string',
        description: 'User location',
        demandOption: false,
      })
      .option('languages', {
        alias: 'p',
        type: 'array',
        description: 'List of programming languages the user knows',
        default: [],
        demandOption: false,
      })
      .check(listUserValidator);
  },
  handler: async (argv: ListUserArgs) => {
    logger.info('List users \u{23F3} ...');
    const { location, languages } = argv as ValidatedListUserArgs;

    try {
      const users = await listUserByLocationAndLanguages({
        location,
        languages,
      });
      logger.info(`\n${users}`);
      logger.info('Done \u{1F389}');
    } catch (error: Error | any) {
      logger.error(`\u{274C} ${error.message} \u{274C}`);
    }
  },
};

import { CommandModule } from 'yargs';
import { listAllUsers } from '../services/user';
import { listUserValidator } from '../validators/list.validator';
import {
  ListUserArgs,
  ValidatedListUserArgs,
} from '../interfaces/list.interface';

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
        alias: 'lang',
        type: 'array',
        description: 'List of programming languages the user knows',
        default: [],
        demandOption: false,
      })
      .check(listUserValidator);
  },
  handler: async (argv: ListUserArgs) => {
    console.log('List all users in the database ...');
    const { location, languages } = argv as ValidatedListUserArgs;

    try {
      const users = await listAllUsers({ location, languages });
      console.log(users);
      console.log('Done');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};

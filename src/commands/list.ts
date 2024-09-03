// import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
// import { ITaskService } from '../interfaces/task-service.interface';
// import { ITask } from '../interfaces/task.interface';
// import { CommandArgument } from '../types/command-argument.types';
// import { TaskPriority } from '../types/task.types';
// import { getUniqTaskId } from '../util/util';
// import { listAllUsers } from '../services/user';

// import { listUsetValidator } from '../validators';
import { listAllUsers } from '../services/github';

import { CommandModule } from 'yargs';

interface ListUserArgs {
  location: string;
  languages: string[];
}

export const listUser: CommandModule<object, ListUserArgs> = {
  command: 'list',
  describe: 'List information in the database',
  builder: {
    location: {
      alias: 'l',
      type: 'string',
      description: 'User location',
    },
    languages: {
      alias: 'lang',
      type: 'array',
      description: 'List of programming languages the user knows',
      // coerce: (arg: any) => {
      //   console.log('---typeof-arg--', typeof arg, arg);
      //   if (typeof arg === 'string') {
      //     return arg.split(',');
      //   }
      //   return arg;
      // },
      default: [],
    },
  },
  handler: async (argv: any) => {
    console.log('List all users in the database ...');
    const { location, languages } = argv;
    // const commandArgument = argv;
    // const isValid = listUsetValidator(argv);
    // if (!isValid) {
    //   return;
    // }

    try {
      const users = await listAllUsers({ location, languages });
      console.log(users);

      // console.log('List all users in the database');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};

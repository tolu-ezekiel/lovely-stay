// import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
// import { ITaskService } from '../interfaces/task-service.interface';
// import { ITask } from '../interfaces/task.interface';
// import { CommandArgument } from '../types/command-argument.types';
// import { TaskPriority } from '../types/task.types';
// import { getUniqTaskId } from '../util/util';
// import { listAllUsers } from '../services/user';

// import { listUsetValidator } from '../validators';
import { listAllUsers } from '../services/github';

export const listUser = {
  command: 'list',
  desc: 'List information in the database',
  handler: async (argv: any) => {
    // const commandArgument = argv;
    // const isValid = listUsetValidator(argv);

    // if (!isValid) {
    //   return;
    // }

    try {
      const users = await listAllUsers();
      console.log(users);

      console.log('List all users in the database');
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};

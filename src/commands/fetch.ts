// import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
// import { ITaskService } from '../interfaces/task-service.interface';
// import { ITask } from '../interfaces/task.interface';
// import { CommandArgument } from '../types/command-argument.types';
// import { TaskPriority } from '../types/task.types';
// import { getUniqTaskId } from '../util/util';
import { fetchGitHubUser } from '../services/github';
// import { fetchValidator } from '../validators';
import { CommandModule } from 'yargs';

interface FetchUserGithubArgs {
  username?: string;
}

export const fetchUserGithubData: CommandModule<object, FetchUserGithubArgs> = {
  command: 'fetch',
  describe: 'Fetch user details from Github', // -- TODO -- pagination
  builder: {
    username: {
      alias: 'u',
      type: 'string',
      description: `User's Github username`,
      demandOption: true,
    },
  },
  handler: async (argv: any) => {
    console.log(`Fetch Github user data for username ${argv.username} ...`);
    // const commandArgument = argv;
    // const isValid = fetchValidator(argv);
    // if (!isValid) {
    //   return;
    // }

    try {
      await fetchGitHubUser(argv.username);
      // console.log(`Fetched Github user data for ${argv.username}`);
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};

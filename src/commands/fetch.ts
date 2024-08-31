// import { getTaskServiceProvider } from '../bootstrap/task-service.provider';
// import { ITaskService } from '../interfaces/task-service.interface';
// import { ITask } from '../interfaces/task.interface';
// import { CommandArgument } from '../types/command-argument.types';
// import { TaskPriority } from '../types/task.types';
// import { getUniqTaskId } from '../util/util';
import { fetchGitHubUser } from '../services/github';
import { fetchValidator } from '../validators';

export const fetchUserGithubData = {
  command: 'fetch <username>',
  desc: 'Fetch user from github', // -- TODO -- pagination
  handler: async (argv: any) => {
    // const commandArgument = argv;
    const isValid = fetchValidator(argv);

    if (!isValid) {
      return;
    }

    try {
      await fetchGitHubUser(argv.username);
      console.log(`Fetched Github user data for ${argv.username}`);
    } catch (e: Error | any) {
      console.error(e.message);
    }
  },
};

import { FetchGithubArgs } from '../interfaces/fetch.interface';

export function fetchGithubValidator(argv: FetchGithubArgs): boolean {
  if (typeof argv.username !== 'string' || argv.username.trim() === '') {
    throw new Error(`The 'username' argument must be a non-empty string`);
  }
  return true;
}

import { ListUserArgs } from '../interfaces/list.interface';

export function listUserValidator(argv: ListUserArgs): boolean {
  if (argv.location && typeof argv.location !== 'string') {
    throw new Error(`The 'location' argument must be a string`);
  }

  if (argv.languages && !Array.isArray(argv.languages)) {
    throw new Error(`The 'languages' argument must be an array`);
  }

  if (
    argv.languages &&
    argv.languages.some((lang) => typeof lang !== 'string')
  ) {
    throw new Error(`All elements in the 'languages' array must be strings`);
  }

  return true;
}

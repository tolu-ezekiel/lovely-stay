import { fetchGithubValidator } from '../src/validators/fetch.validator';
import { FetchGithubArgs } from '../src/interfaces/user.interface';

describe('fetchGithubValidator', () => {
  it('should return true for valid non-empty string username', () => {
    const validArgs1: FetchGithubArgs = { username: 'ezekiel' };
    const validArgs2: FetchGithubArgs = { username: '   tolu   ' };

    expect(fetchGithubValidator(validArgs1)).toEqual(true);
    expect(fetchGithubValidator(validArgs2)).toEqual(true);
    expect(() => fetchGithubValidator(validArgs1)).not.toThrow();
    expect(() => fetchGithubValidator(validArgs2)).not.toThrow();
  });

  it('should throw an error if username is an empty string', () => {
    const invalidArgs: FetchGithubArgs = { username: '' };

    expect(() => fetchGithubValidator(invalidArgs)).toThrow(
      `The 'username' argument must be a non-empty string`,
    );
  });

  it('should throw an error if username is only whitespace', () => {
    const invalidArgs: FetchGithubArgs = { username: '   ' };

    expect(() => fetchGithubValidator(invalidArgs)).toThrow(
      `The 'username' argument must be a non-empty string`,
    );
  });

  it('should throw an error if username is not a string', () => {
    const invalidArgs1: any = { username: 123 };
    const invalidArgs2: any = { username: null };
    const invalidArgs3: any = { username: [] };
    const invalidArgs4: any = { username: {} };

    expect(() => fetchGithubValidator(invalidArgs1)).toThrow(
      `The 'username' argument must be a non-empty string`,
    );
    expect(() => fetchGithubValidator(invalidArgs2)).toThrow(
      `The 'username' argument must be a non-empty string`,
    );
    expect(() => fetchGithubValidator(invalidArgs3)).toThrow(
      `The 'username' argument must be a non-empty string`,
    );
    expect(() => fetchGithubValidator(invalidArgs4)).toThrow(
      `The 'username' argument must be a non-empty string`,
    );
  });

  it('should handle edge cases', () => {
    const validArgs1: FetchGithubArgs = { username: 'a' };
    const validArgs2: FetchGithubArgs = { username: '   validUser' };
    const validArgs3: FetchGithubArgs = { username: 'validUser   ' };
    const validArgs4: FetchGithubArgs = { username: '   validUser   ' };

    expect(() => fetchGithubValidator(validArgs1)).not.toThrow();
    expect(() => fetchGithubValidator(validArgs2)).not.toThrow();
    expect(() => fetchGithubValidator(validArgs3)).not.toThrow();
    expect(() => fetchGithubValidator(validArgs4)).not.toThrow();
    expect(fetchGithubValidator(validArgs1)).toEqual(true);
    expect(fetchGithubValidator(validArgs2)).toEqual(true);
    expect(fetchGithubValidator(validArgs3)).toEqual(true);
    expect(fetchGithubValidator(validArgs4)).toEqual(true);
  });
});

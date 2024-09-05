import { listUserValidator } from '../src/validators/list.validator';
import { ListUserArgs } from '../src/interfaces/user.interface';

describe('listUserValidator', () => {
  it('should return true for valid input', () => {
    const validArgs: ListUserArgs = {
      location: 'New York',
      languages: ['JavaScript', 'Python'],
    };

    expect(listUserValidator(validArgs)).toEqual(true);
    expect(() => listUserValidator(validArgs)).not.toThrow();
  });

  it('should throw an error if location is not a string', () => {
    const invalidArgs: ListUserArgs = {
      location: 123 as any,
      languages: ['JavaScript', 'Python'],
    };

    expect(() => listUserValidator(invalidArgs)).toThrow(
      `The 'location' argument must be a string`,
    );
  });

  it('should throw an error if languages is not an array', () => {
    const invalidArgs: ListUserArgs = {
      location: 'New York',
      languages: 'JavaScript' as any,
    };

    expect(() => listUserValidator(invalidArgs)).toThrow(
      `The 'languages' argument must be an array`,
    );
  });

  it('should throw an error if elements in languages array are not strings', () => {
    const invalidArgs: ListUserArgs = {
      location: 'New York',
      languages: ['JavaScript', 123 as any],
    };

    expect(() => listUserValidator(invalidArgs)).toThrow(
      `All elements in the 'languages' array must be strings`,
    );
  });
});

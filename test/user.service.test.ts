import Table from 'cli-table3';
import { getDataFromUrl } from '../src/utils/axios';
import { formatLanguagePayload } from '../src/utils/create-language-payload';
import {
  insertUser,
  bulkInsertLanguages,
  getUsersByLocationAndLanguages,
} from '../src/db/data-access/queries';
import {
  fetchGitHubUser,
  listUserByLocationAndLanguages,
} from '../src/services/user';

jest.mock('../src/utils/create-language-payload');
jest.mock('../src/utils/axios');
jest.mock('../src/db/data-access/queries');
const mockFormatLanguagePayload = formatLanguagePayload as jest.Mock;
const mockGetDataFromUrl = getDataFromUrl as jest.Mock;
const mockInsertUser = insertUser as jest.Mock;
const mockBulkInsertLanguages = bulkInsertLanguages as jest.Mock;
const mockGetUsersByLocationAndLanguages =
  getUsersByLocationAndLanguages as jest.Mock;

describe('User Service', () => {
  describe('fetchGitHubUser', () => {
    const username = 'tolu_ezekiel';
    const githubUserResponse = {
      id: 1,
      name: 'Ezekiel',
      email: 'ezekiel@example.com',
      login: 'tolu_ezekiel',
      public_repos: 10,
      location: 'Berlin',
    };

    const githubUserReposResponse = [
      { language: 'JavaScript' },
      { language: 'Python' },
      { language: 'JavaScript' },
    ];

    const newUser = {
      id: 1,
      github_id: githubUserResponse.id,
      name: githubUserResponse.name,
      username: githubUserResponse.login,
      email: githubUserResponse.email,
      public_repos: githubUserResponse.public_repos,
      location: githubUserResponse.location,
    };

    const userLanguagePayload = [
      { user_id: 1, language: 'JavaScript' },
      { user_id: 1, language: 'Python' },
    ];

    it('should fetch user data from GitHub, insert user into database, and insert languages', async () => {
      mockGetDataFromUrl.mockResolvedValueOnce(githubUserResponse);
      mockInsertUser.mockResolvedValue(newUser);
      mockGetDataFromUrl.mockResolvedValueOnce(githubUserReposResponse);
      mockFormatLanguagePayload.mockReturnValue(userLanguagePayload);
      mockBulkInsertLanguages.mockResolvedValue(true);

      await fetchGitHubUser(username);

      expect(getDataFromUrl).toHaveBeenCalledWith(
        `https://api.github.com/users/${username}`,
      );
      expect(insertUser).toHaveBeenCalledWith({
        github_id: 1,
        name: 'Ezekiel',
        email: 'ezekiel@example.com',
        username: 'tolu_ezekiel',
        public_repos: 10,
        location: 'Berlin',
      });
      expect(getDataFromUrl).toHaveBeenCalledWith(
        `https://api.github.com/users/${username}/repos`,
      );
      expect(formatLanguagePayload).toHaveBeenCalledWith({
        user: newUser,
        githubUserRepos: githubUserReposResponse,
      });
      expect(bulkInsertLanguages).toHaveBeenCalledWith(userLanguagePayload);
    });

    it('should throw an error if GitHub user not found', async () => {
      mockGetDataFromUrl.mockResolvedValueOnce(null);

      await expect(fetchGitHubUser('invaliduser')).rejects.toThrow(
        'No Github user with username invaliduser',
      );
    });
  });

  describe('listUserByLocationAndLanguages', () => {
    it('should return a formatted table of users by location and languages', async () => {
      const userResponse = [
        {
          id: 1,
          github_id: 'tolu_ezekiel',
          name: 'Ezekiel',
          username: 'tolu_ezekiel',
          email: 'ezekiel@example.com',
          public_repos: 10,
          location: 'Berlin',
          languages: ['JavaScript', 'Python'],
        },
      ];

      const expectedTable = new Table({
        head: [
          'id',
          'github_id',
          'name',
          'username',
          'email',
          'public_repos',
          'location',
          'languages',
        ],
        colWidths: [5, 12, 12, 15, 15, 15, 20, 25],
        wordWrap: true,
      });
      expectedTable.push([
        1,
        'ezekiel',
        'Ezekiel',
        'tolu_ezekiel',
        'ezekiel@example.com',
        10,
        'berliB',
        'JavaScript, Python',
      ]);
      const tableOutput = 'formatted table output';

      mockGetUsersByLocationAndLanguages.mockResolvedValue(userResponse);
      Table.prototype.toString = jest.fn().mockReturnValue(tableOutput);

      const result = await listUserByLocationAndLanguages({
        location: 'Berlin',
        languages: ['JavaScript', 'Python'],
      });

      expect(getUsersByLocationAndLanguages).toHaveBeenCalledWith({
        location: 'Berlin',
        languages: ['JavaScript', 'Python'],
      });
      expect(result).toBe(tableOutput);
    });
  });
});

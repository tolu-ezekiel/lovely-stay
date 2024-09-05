import { formatLanguagePayload } from '../src/utils/create-language-payload';
import {
  UserGithubLangugeFormatter,
  CreateUserGithubLanguagePayload,
} from '../src/interfaces/user.interface';

const input: UserGithubLangugeFormatter = {
  user: {
    id: 1,
    github_id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    public_repos: 10,
    location: 'Berlin',
  },
  githubUserRepos: [
    { id: 1, node_id: '1', name: 'name 1', language: 'JavaScript' },
    { id: 2, node_id: '2', name: 'name 2', language: 'Python' },
    { id: 3, node_id: '3', name: 'name 3', language: 'JavaScript' },
    { id: 4, node_id: '4', name: 'name 4', language: null as any },
    { id: 5, node_id: '5', name: 'name 5', language: undefined as any },
  ],
};

describe('formatLanguagePayload', () => {
  it('should return an array of objects with unique languages', () => {
    const expectedOutput: CreateUserGithubLanguagePayload[] = [
      { user_id: 1, language: 'JavaScript' },
      { user_id: 1, language: 'Python' },
    ];

    expect(formatLanguagePayload(input)).toEqual(expectedOutput);
  });

  it('should handle empty githubUserRepos array', () => {
    const payload: UserGithubLangugeFormatter = {
      ...input,
      githubUserRepos: [],
    };

    const expectedOutput: CreateUserGithubLanguagePayload[] = [];

    expect(formatLanguagePayload(payload)).toEqual(expectedOutput);
  });

  it('should handle missing languages', () => {
    const payload: UserGithubLangugeFormatter = {
      ...input,
      githubUserRepos: [{ language: null }, { language: undefined }] as any,
    };

    const expectedOutput: CreateUserGithubLanguagePayload[] = [];

    expect(formatLanguagePayload(payload)).toEqual(expectedOutput);
  });
});

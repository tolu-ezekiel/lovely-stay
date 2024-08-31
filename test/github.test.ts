import { fetchGitHubUser, fetchGitHubUserRepos } from '../src/services/github';

test('fetches GitHub user', async () => {
  const user = await fetchGitHubUser('octocat');
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
});

test('fetches GitHub user repos', async () => {
  const repos = await fetchGitHubUserRepos('octocat');
  expect(repos).toContain('JavaScript');
});

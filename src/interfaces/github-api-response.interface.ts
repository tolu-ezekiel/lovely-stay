export interface FetchGithubUserResponse {
  login: string;
  id: number;
  node_id: string;
  name: string;
  email: string | null;
  public_repos: number | null;
  location: string | null;
}

export interface FetchGithubRepoResponse {
  id: number;
  node_id: string;
  name: string;
  language: string;
}

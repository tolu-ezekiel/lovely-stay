export interface FetchGithubUserResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string | null;
  gravatar_id: string | null;
  url: string;
  repos_url: string;
  name: string;
  email: string | null;
  location: string | null;
  company: string | null;
  bio: string | null;
  public_repos: number | null;
  public_gists: number | null;
  followers: number | null;
  following: number | null;
}

export interface FetchGithubRepoResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  description: string | null;
  url: string;
  visibility: string;
}

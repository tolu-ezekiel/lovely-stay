import { User } from '@prisma/client';
import { FetchGithubRepoResponse } from './github-api-response.interface';

export interface FetchGithubArgs {
  username: string;
}

export interface CreateUserPayload extends Omit<User, 'id'> {
  id?: number;
}

export interface ListUserArgs {
  location?: string;
  languages: (string | number)[];
}

export interface ValidatedListUserArgs {
  location?: string;
  languages: string[];
}

export interface UserGithubLangugeFormatter {
  user: User;
  githubUserRepos: FetchGithubRepoResponse[];
}

export interface CreateUserGithubLanguagePayload {
  user_id: number;
  language: string;
}

export interface UserByLocationAndLanguages extends User {
  languages: string[];
}

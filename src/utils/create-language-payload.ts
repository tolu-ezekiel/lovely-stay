import * as R from 'ramda';
import {
  UserGithubLangugeFormatter,
  CreateUserGithubLanguagePayload,
} from '../interfaces/user.interface';

export const formatLanguagePayload = ({
  user,
  githubUserRepos,
}: UserGithubLangugeFormatter): CreateUserGithubLanguagePayload[] => {
  const uniqueLanguages = R.pipe(
    R.map(R.prop('language')),
    R.reject(R.isNil),
    R.uniq,
  )(githubUserRepos);

  const languagePayload = uniqueLanguages.map((language: string) => {
    return { user_id: user.id, language };
  });

  return languagePayload;
};

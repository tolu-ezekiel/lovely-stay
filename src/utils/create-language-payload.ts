import {
  UserGithubLangugeFormatter,
  CreateUserGithubLanguagePayload,
} from '../interfaces/user.interface';

export const formatLanguagePayload = ({
  user,
  githubUserRepos,
}: UserGithubLangugeFormatter): CreateUserGithubLanguagePayload[] => {
  const uniqueLanguages = githubUserRepos
    .map((repo) => repo.language)
    .filter((lang) => !!lang)
    .filter((lang, index, self) => self.indexOf(lang) === index);

  const languagePayload = uniqueLanguages.map((language: string) => {
    return { user_id: user.id, language };
  });

  return languagePayload;
};

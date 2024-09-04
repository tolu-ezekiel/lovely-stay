export interface ListUserArgs {
  location?: string;
  languages: (string | number)[];
}

export interface ValidatedListUserArgs {
  location?: string;
  languages: string[];
}

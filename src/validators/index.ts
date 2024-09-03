export function fetchValidator(commandArgument: any): boolean {
  if (!commandArgument.username) {
    console.error('username is required');
    return false;
  }

  return true;
}

export function listUsetValidator(commandArgument: any): boolean {
  if (!commandArgument.username) {
    console.error('username is required');
    return false;
  }

  return true;
}

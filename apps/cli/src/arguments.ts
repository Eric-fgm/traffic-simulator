const validateProcessArguments = (args: string[]): args is [string, string] => {
  return args.length === 2 && args.every((arg) => arg.trim().length > 0);
};

export const getProcessArguments = (): [string, string] => {
  const args = process.argv.slice(2);

  if (!validateProcessArguments(args)) {
    throw new Error("You must provide exactly two non-empty arguments.");
  }

  return args;
};

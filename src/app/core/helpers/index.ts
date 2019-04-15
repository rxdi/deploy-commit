import { MAIN_ARGUMENTS } from "app/app.injection";

export const includes = (i: MAIN_ARGUMENTS) =>
  process.argv.toString().includes(i);
export const nextOrDefault = (
  i: MAIN_ARGUMENTS,
  fb: any = true,
  type = p => p
) => {
  if (process.argv.toString().includes(i)) {
    const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];
    if (!isNextArgumentPresent) {
      return fb;
    }
    if (isNextArgumentPresent.includes("--")) {
      return fb;
    }
    return type(isNextArgumentPresent);
  }
  return fb;
};

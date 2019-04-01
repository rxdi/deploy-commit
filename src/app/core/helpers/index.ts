import { MAIN_COMMANDS } from "app/app.injection";

export const includes = (i: MAIN_COMMANDS) => process.argv.toString().includes(i);
export const nextOrDefault = (i: MAIN_COMMANDS, fb: any = true, type = (p) => (p)) => {
    if (process.argv.toString().includes(i)) {
        const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];
        if (!isNextArgumentPresent) {
            return fb;
        }
        if (isNextArgumentPresent.includes('--')) {
            return fb;
        }
        return type(isNextArgumentPresent);
    }
    return fb;
}

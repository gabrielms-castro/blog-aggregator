import { readConfig } from "src/config";

export function getCurrentUser() {
    const configs = readConfig();
    return configs.currentUserName ?? null;
}
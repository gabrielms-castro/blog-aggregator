import { setUser } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function loginHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const username = args[0]
    const existing = await getUserByName(username);
    if (!existing) {
        throw new Error(`Username "${username}" doesn't exists`);
    }
    setUser(username);
    console.log(`Logged in with username "${username}".`)
}    
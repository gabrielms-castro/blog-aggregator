import { setUser } from "src/config";

export function loginHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const username = args[0]
    setUser(username)
    console.log(`The username "${username} has been set.`)
}
import { setUser } from "src/config";
import { createUser, getUserByName } from "src/lib/db/queries/users";
import { CommandHandler, CommandRegistry } from "src/types/command_handler";

export async function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler): Promise<void> {
    // this function registers a new handler function for a command name
    registry[cmdName] = handler
}

export async function registerHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }
    const username = args[0]

    const existing = await getUserByName(username);
    if (existing) {
        throw new Error(`Username "${username}" already exists`);
    }    

    const user = await createUser(username);
    await setUser(username);
    console.log(`User created: ${JSON.stringify(user)}`);
}
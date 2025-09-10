import { CommandRegistry } from "src/types/command_handler";

export async function runCommand(registry: CommandRegistry, cmdName: string, ...args: string[]): Promise<void> {
    // runs a given command with the provided stat if it exists
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Unknown command: ${cmdName}`)
    }
    await handler(cmdName, ...args);
}
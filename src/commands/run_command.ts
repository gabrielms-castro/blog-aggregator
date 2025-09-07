import { CommandRegistry } from "src/types/command_handler";

export function runCommand(registry: CommandRegistry, cmdName: string, ...args: string[]): void {
    // runs a given command with the provided stat if it exists
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Unknown command: ${cmdName}`)
    }
    handler(cmdName, ...args);
}
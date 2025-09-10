import { CommandHandler, CommandRegistry } from "src/types/command_handler";

export async function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler): Promise<void> {
    // this function registers a new handler function for a command name
    registry[cmdName] = handler
}
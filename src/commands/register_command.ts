import { CommandHandler, CommandRegistry } from "src/types/command_handler";

export function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler): void {
    // this function registers a new handler function for a command name
    registry[cmdName] = handler
}
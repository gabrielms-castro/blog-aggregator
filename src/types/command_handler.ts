export type CommandHandler = (cmdName:string, ...args: string[]) => void;
export type CommandRegistry = Record<string, CommandHandler>;
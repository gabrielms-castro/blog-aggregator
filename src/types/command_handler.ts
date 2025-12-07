import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { User } from "src/lib/db/schemas/schemas";

export type CommandHandler = (
    cmdName:string, 
    ...args: string[]
) => Promise<void>;


export type CommandRegistry = Record<string, CommandHandler>;

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void> | void;

export function middlewareLoggedIn (handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]): Promise<void> => {
        const currentUser = readConfig().currentUserName;
        if(!currentUser) {
            throw new Error("Can't find a logged user.");
        }
        
        const user = await getUserByName(currentUser);
        if (!user) {
            throw new Error(`User ${currentUser} not found`);
        }  

        await handler(cmdName, user, ...args)
    }
}
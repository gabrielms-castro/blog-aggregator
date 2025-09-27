import { CommandRegistry } from "./types/command_handler.js"
import { registerCommand, registerHandler } from "./commands/register_command.js"
import { addFeedHandler } from "./commands/addFeed.js";
import { aggHandler } from "./commands/agg_command.js";
import { getUsersHandler, deleteUserHandler } from "./commands/users_command.js";
import { loginHandler } from "./commands/login_handler.js"
import { resetHandler } from "./commands/reset_command.js";
import { runCommand } from "./commands/run_command.js";

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log("Usage: CLI <command> [args...]");
        process.exit(1)
    }

    const cmdName = args[0];
    const cmdArgs = args.slice(1)
    const commandRegistry: CommandRegistry = {}

    
    try {
        await registerCommand(commandRegistry, "login", loginHandler)
        await registerCommand(commandRegistry, "register", registerHandler);
        await registerCommand(commandRegistry, "delete", deleteUserHandler);
        await registerCommand(commandRegistry, "reset", resetHandler);
        await registerCommand(commandRegistry, "users", getUsersHandler)
        await registerCommand(commandRegistry, "agg", aggHandler)
        await registerCommand(commandRegistry, "addfeed", addFeedHandler)

        await runCommand(commandRegistry, cmdName, ...cmdArgs)

    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error running command ${cmdName}: ${err.message}`)
        } else {
            console.error(`Error running command ${cmdName}: ${err}`)
        }
        process.exit(1)
    }

    process.exit(0)
}

main()
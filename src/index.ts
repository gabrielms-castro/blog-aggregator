import { loginHandler } from "./commands/login_handler"
import { registerCommand } from "./commands/register_command"
import { runCommand } from "./commands/run_command";
import { readConfig, setUser } from "./config"
import { CommandRegistry } from "./types/command_handler"

function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log("Usage: CLI <command> [args...]");
        process.exit(1)
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1)
    const commandRegistry: CommandRegistry = {}

    registerCommand(commandRegistry, "login", loginHandler)

    try {
        runCommand(commandRegistry, "login", ...cmdArgs)
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error running command ${cmdName}: ${err.message}`)
        } else {
            console.error(`Error running command ${cmdName}: ${err}`)
        }
        process.exit(1)
    }
}

main()
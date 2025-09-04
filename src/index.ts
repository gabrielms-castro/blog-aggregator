import { readConfig, setUser } from "./config"

function main() {
    setUser("Gabriel")
    const cfg = readConfig()
    console.log(`dbUrl: ${cfg.dbUrl}`)
    console.log(`currentUserName: ${cfg.currentUserName}`)
}

main()
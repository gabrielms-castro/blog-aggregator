import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string;
    currentUserName?: string;
}

export function setUser(user: string) {
    const prev = readConfig()
    writeConfig({ 
        dbUrl: prev.dbUrl, 
        currentUserName: user 
    });
}

export function readConfig(): Config {
    const configContent = fs.readFileSync(getConfigFilePath(), 'utf-8');
    const parsedFile = JSON.parse(configContent);
    const validate = validateConfig(parsedFile);

    if (validate) {
        return validate as Config;
    } else {
        throw new Error(`Unable to determine config file path.`);
    }
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json")
}

function writeConfig(cfg: Config) {
    const out = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    }
    fs.writeFileSync(
        getConfigFilePath(), // file
        JSON.stringify(out, null, 2) // data
    );
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig || typeof rawConfig.db_url !== "string") {
        throw new Error("Config.dbUrl not valid.");
    }
    if (typeof rawConfig.current_user_name !== "undefined" && 
        typeof rawConfig.current_user_name !== "string"
    ) {
        throw new Error("Config.currentUserName not valid.");
    }
    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };
}
   


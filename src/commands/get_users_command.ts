import { readConfig } from "src/config";
import { listUsers } from "src/lib/db/queries/users";

export async function getUsersHandler(_: string) {
    const users = await listUsers();

    const configs = readConfig()

    for (const user of users) {
        if (user.name === configs.currentUserName) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }
}
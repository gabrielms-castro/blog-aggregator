import { deleteUser, getUserByName } from "src/lib/db/queries/users";

export async function deleteUserHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <username | name>`)
    }
    const username = args[0]
    const existing = await getUserByName(username);
    if (existing) {
        const deleted = await deleteUser(username);
        console.log(`User deleted: ${JSON.stringify(deleted)}`);
    } else {
        throw new Error(`Username "${username}" doesn't exists`);
    }
}

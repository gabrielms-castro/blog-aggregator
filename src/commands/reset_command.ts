import { deleteAllUsers } from "src/lib/db/queries/users";

export async function resetHandler(cmdName: string, ...args: string[]) {
    await deleteAllUsers();
    console.log(`All users deleted`);
}

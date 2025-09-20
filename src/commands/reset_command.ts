import { deleteAllUsers } from "src/lib/db/queries/users";

export async function resetHandler(_: string) {
    const resetUsers = await deleteAllUsers();
    console.log(`All users deleted: ${JSON.stringify(resetUsers)}`);
}

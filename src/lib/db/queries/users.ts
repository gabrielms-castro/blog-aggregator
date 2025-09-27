import { db } from "..";
import { users } from "src/lib/db/schemas/schemas.js";
import { eq  } from "drizzle-orm";

export async function createUser(name: string) {
    const [result] = await db
        .insert(users)
        .values({name: name})
        .returning();
        
    return result;
}

export async function getUserByName(name: string) {
    const [query] = await db
        .select()
        .from(users)
        .where(eq(users.name, name))
    
    return query ?? null;
}

export async function listUsers() {
    const query = await db
        .select()
        .from(users)
    return query ?? null
}

export async function deleteUser(name: string) {
    const [result] = await db
        .delete(users)
        .where(eq(users.name, name))   
        .returning();
    return result;        
}

export async function deleteAllUsers() {
    const [result] = await db
        .delete(users)
        .returning();
    return result;
}
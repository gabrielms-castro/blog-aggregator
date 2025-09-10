import { db } from "..";
import { users } from "src/lib/db/schemas/users";
import { eq  } from "drizzle-orm";

export async function createUser(name: string) {
    const [result] = await db
        .insert(users)
        .values({name: name})
        .returning();
        
    return result
}

export async function getUserByName(name: string) {
    const [query] = await db
        .select()
        .from(users)
        .where(eq(users.name, name))
    
        return query ?? null
}
import { db } from "..";
import { feeds } from "src/lib/db/schemas/schemas.js";

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db
        .insert(feeds)
        .values({name: name, url: url, user_id: userId})
        .returning();
    return result;
}

export async function listFeeds() {
    const query = await db
        .select()
        .from(feeds);
    return query;
}
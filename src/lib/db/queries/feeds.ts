import { db } from "..";
import { feeds } from "src/lib/db/schemas/schemas.js";
import { desc, eq, sql  } from "drizzle-orm";

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db
        .insert(feeds)
        .values({name: name, url: url, userId: userId})
        .returning();
    return result;
}

export async function listFeeds() {
    const query = await db
        .select()
        .from(feeds);
    return query;
}

export async function getFeedByURL(url: string) {
    const [feed] = await db
        .select()
        .from(feeds)
        .where(eq(feeds.url, url))
        .limit(1);
    return feed ?? null;
}

export async function markFeedFetched(feedID: string) {
    const [feed] = await db
        .update(feeds)
        .set({
            lastFetchAt: new Date(),
        })
        .where(eq(feeds.id, feedID))
        .returning()
    return feed
}

export async function getNextFeedToFetch() {
  const [result] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchAt} asc nulls first`)
    .limit(1);
  return result;
}

import { RSSItem } from "src/types/rss_feed";
import { db } from "..";
import { feeds, posts } from "src/lib/db/schemas/schemas.js";
import { eq, desc } from "drizzle-orm";

export type CreatePost = {
    metadata: RSSItem;
    feedId:string
}

export async function createPost(input: CreatePost) {
    const [result] = await db
        .insert(posts)
        .values({
            title: input.metadata.title,
            url: input.metadata.link,
            description: input.metadata.description,
            publishedAt: input.metadata.pubDate,
            feedId: input.feedId
        })
        .returning()
    
    return result
}

export async function getPostsForUser(userID: string) {
    const query = await db
        .select()
        .from(posts)
        .innerJoin(feeds, eq(posts.feedId, feeds.id))
        .where(eq(feeds.userId, userID))
        .orderBy(desc(posts.publishedAt))

    return query
}
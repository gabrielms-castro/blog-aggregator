import { db } from "..";
import { feedFollows, feeds, NewPost, posts } from "src/lib/db/schemas/schemas.js";
import { eq, desc } from "drizzle-orm";

export async function createPost(input: NewPost) {
    const [result] = await db
        .insert(posts)
        .values(input)
        .returning()
    
    return result
}

export async function getPostsForUser(userID: string) {
    const query = await db
        .select({
            id: posts.id,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
            title: posts.title,
            url: posts.url,
            description: posts.description,
            publishedAt: posts.publishedAt,
            feedId: posts.feedId,
            feedName: feeds.name,
        })
        .from(posts)
        .innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
        .innerJoin(feeds, eq(posts.feedId, feeds.id))
        .where(eq(feedFollows.userId, userID))
        .orderBy(desc(posts.publishedAt))

    return query
}

export async function getPostByURL(url: string) {
    const [query] = await db
        .select()
        .from(posts)
        .where(eq(posts.url, url))
    return query ?? null
}
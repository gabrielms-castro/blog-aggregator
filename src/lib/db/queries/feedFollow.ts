import { eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schemas/schemas";

export async function createFeedFollow(userId: string, feedId: string) {

    const [newFeedFollow] = await db
        .insert(feedFollows)
        .values({ userId: userId, feedId: feedId})
        .returning({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId
        });

    const [row] = await db
        .select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            userName: users.name,
            feedName: feeds.name 
        })
        .from(feedFollows)
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .where(eq(feedFollows.id, newFeedFollow.id))
        .limit(1);

    return row ?? null;
}

export async function getFeedFollowsForUser(userId: string) {
    const [query] = await db
        .select()
        .from(feedFollows)
        .where(eq(feedFollows.userId, userId
    ))
}
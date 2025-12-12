import { getFeedFollowsForUser } from "src/lib/db/queries/feedFollow";
import { User } from "src/lib/db/schemas/schemas";

export async function followingHandler(_:string, user: User) {
    const userId = user.id
    const userName = user.name
    
    const following = await getFeedFollowsForUser(userId);
    if (following.length === 0) {
        console.log(`No feed follows found for this user.`)
        return
    }

    console.log(`${userName} is following:`);
    for (const feedFollow of following) {
        console.log(` * ${feedFollow.feedname}`);
    }
}
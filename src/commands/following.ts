import { getFeedFollowsForUser } from "src/lib/db/queries/feedFollow";
import { getUserByName } from "src/lib/db/queries/users";
import { getCurrentUser } from "src/utils/get_current_user";

export async function followingHandler(cmdName: string, ...args: string[]) {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Not logged in");
    
    const userData = await getUserByName(currentUser);
    if (!userData) throw new Error("User not found");
    const userId = userData.id
    const userName = userData.name
    
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
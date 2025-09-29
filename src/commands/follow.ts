import { createFeedFollow } from "src/lib/db/queries/feedFollow";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";
import { getCurrentUser } from "src/utils/get_current_user";
import { isURLvalid } from "src/utils/is_url_valid";

export async function followHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`)
    }
    
    const url = args[0];
    if (!isURLvalid(url)) throw new Error(`Invalid URL: ${url}. Provide a valid URL to fetch.`);

    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("Not logged in");
    
    const userData = await getUserByName(currentUser);
    if (!userData) throw new Error("User not found");
    const userId = userData.id
    
    const feedData = await getFeedByURL(url);
    if (!feedData) throw new Error("Feed not found");
    const feedId = feedData.id;

    const createdFeedFollow = await createFeedFollow(userId, feedId);

    console.log(`${createdFeedFollow.userName} is now following ${createdFeedFollow.feedName}`);
}
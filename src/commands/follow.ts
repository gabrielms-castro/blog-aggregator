import { createFeedFollow } from "src/lib/db/queries/feedFollow";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/schemas/schemas";
import { isURLvalid } from "src/utils/is_url_valid";

export async function followHandler(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`)
    }
    
    const url = args[0];
    if (!isURLvalid(url)) throw new Error(`Invalid URL: ${url}. Provide a valid URL to fetch.`);

    const userId = user.id
    
    const feedData = await getFeedByURL(url);
    if (!feedData) throw new Error("Feed not found");
    const feedId = feedData.id;

    const createdFeedFollow = await createFeedFollow(userId, feedId);

    console.log(`${createdFeedFollow.userName} is now following ${createdFeedFollow.feedName}`);
}
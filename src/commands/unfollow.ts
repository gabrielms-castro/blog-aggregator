import { unfollowFeed } from "src/lib/db/queries/feedFollow";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { User } from "src/lib/db/schemas/schemas";
import { isURLvalid } from "src/utils/is_url_valid";

export async function unfollowHandler(
    cmdName: string, 
    user: User, 
    ...args: string[]): Promise<void> {
        if (args.length !== 1) {
            throw new Error(`usage: ${cmdName} <url>`)
        }

        const feedURL = args[0]
        if (!isURLvalid(feedURL)) throw new Error(`Invalid URL: ${feedURL}. Provide a valid URL to fetch.`);

        const feedData = await getFeedByURL(feedURL);
        if (!feedData) throw new Error("Feed not found");
        const feedID = feedData.id;
        const result = await unfollowFeed(user.id, feedID)
}
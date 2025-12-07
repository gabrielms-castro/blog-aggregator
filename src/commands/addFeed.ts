import { readConfig } from "src/config.js";
import { createFeedFollow } from "src/lib/db/queries/feedFollow";
import { createFeed } from "src/lib/db/queries/feeds.js";
import { getUserByName } from "src/lib/db/queries/users.js";
import { Feed, User } from "src/lib/db/schemas/schemas.js";

export async function addFeedHandler(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed name> <feed URL>`)
    }
    const feedName = args[0];
    const feedURL = args[1];
    const userId = user.id

    const newFeed = await createFeed(feedName, feedURL, userId)
    printFeed(newFeed, user)

    const createdFeedFollow = await createFeedFollow(userId, newFeed.id);
    console.log(`${createdFeedFollow.userName} is now following ${createdFeedFollow.feedName}`);
}

function printFeed(feed: Feed, user: User) {
    console.log("New Feed created:")
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.createdAt}`);
    console.log(`* Updated:       ${feed.updatedAt}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}
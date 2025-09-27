import { readConfig } from "src/config.js";
import { createFeed } from "src/lib/db/queries/feeds.js";
import { getUserByName } from "src/lib/db/queries/users.js";
import { Feed, User } from "src/lib/db/schemas/schemas.js";

export async function addFeedHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed name> <feed URL>`)
    }
    const feedName = args[0];
    const feedURL = args[1];

    const currentUser = readConfig().currentUserName;
    if(!currentUser) {
        throw new Error("Can't find a logged user.");
    }

    const userData = await getUserByName(currentUser);
    if (!userData) {
        throw new Error(`Error fetching user: ${currentUser}`)
    }
    const userId = userData.id

    const newFeed = await createFeed(feedName, feedURL, userId)
    printFeed(newFeed, userData)
}

function printFeed(feed: Feed, user: User) {
    console.log("New Feed created:")
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.created_at}`);
    console.log(`* Updated:       ${feed.updated_at}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}
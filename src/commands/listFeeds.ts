import { listFeeds } from "src/lib/db/queries/feeds";
import { getUserByID } from "src/lib/db/queries/users";

export async function listFeedsHandler(_:string) {
    const feeds = await listFeeds();

    for (const feed of feeds) {
        
        const userData = await getUserByID(feed.userId);
        const userName = userData.name;

        console.log();
        console.log(feed.name);
        console.log(feed.url);
        console.log(userName);
    }
}
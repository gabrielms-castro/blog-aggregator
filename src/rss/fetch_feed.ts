import { XMLParser } from "fast-xml-parser";
import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { CreatePost, createPost } from "src/lib/db/queries/posts";
import { getUserByName } from "src/lib/db/queries/users";
import { Feed } from "src/lib/db/schemas/schemas";
import { RSSFeed, RSSItem } from "src/types/rss_feed";
import { getCurrentUser } from "src/utils/get_current_user";

export async function fetchFeed(feedURL: string) {
    const response = await fetch (feedURL, {
        headers: {
            'User-Agent': 'gator',
            accept: "application/rss+xml"
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching feed: ${response.status} ${response.statusText}`);
    }

    const feedText = await response.text();
    const parser = new XMLParser();
    let feed = parser.parse(feedText);
    
    const channel = feed.rss?.channel;
    if (!channel) {
        throw new Error("Failed to parse RSS channel");
    }
    
    if (
        !channel ||
        !channel.title ||
        !channel.link ||
        !channel.description||
        !channel.item
    ) {
        throw new Error("Failed to parse RSS channel");
    }
    
    const feedItems: any[] = Array.isArray(channel.item) ? channel.item : [channel.item];

    const rssItems: RSSItem[] = [];

    for (const item of feedItems) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }

        rssItems.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate
        });
    }
    const rssFeed: RSSFeed = {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: rssItems,
        },
    };

    return rssFeed
}

export async function scrapeFeeds() {
    const nextFeed = await getNextFeedToFetch()
    if (!nextFeed) {
        console.log(`No feeds to fetch.`);
        return;        
    }
    scrapeFeed(nextFeed)
}

async function scrapeFeed(feed: Feed) {
    await markFeedFetched(feed.id)
    const feedData = await fetchFeed(feed.url)
    console.log(
        `Feed ${feedData.channel.title} collected`,
    );    

    const postObj: CreatePost = {
        metadata: {
            title : feedData.channel.title,
            link : feedData.channel.link,
            description : feedData.channel.description,
            pubDate : feedData.channel.item[0].pubDate
        },
        feedId: feed.id
    }
    await createPost(postObj)
}


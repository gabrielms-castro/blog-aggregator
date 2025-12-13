import { XMLParser } from "fast-xml-parser";
import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { CreatePost, createPost, getPostByURL } from "src/lib/db/queries/posts";
import { getUserByName } from "src/lib/db/queries/users";
import { Feed, NewPost } from "src/lib/db/schemas/schemas";
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
    console.log(`Found a feed to fetch!`);
    scrapeFeed(nextFeed)
}

async function scrapeFeed(feed: Feed) {
    await markFeedFetched(feed.id)
    const feedData = await fetchFeed(feed.url)
    for (let item of feedData.channel.item) {
        console.log(`Found post: %s`, item.title);

        const postDataIfExists = await getPostByURL(item.link)
        if (postDataIfExists) {
            console.log(`Post ${item.title} already exists in database.`);
            continue;
        }
        const now = new Date();
        await createPost({
            url: item.link,
            feedId: feed.id,
            title: item.title,
            createdAt: now,
            updatedAt: now,
            publishedAt: new Date(item.pubDate),
            description: item.description
        } satisfies NewPost)
    }

    console.log(
        `Feed ${feed.name} collected, ${feedData.channel.item.length} posts found`,
    );    
}


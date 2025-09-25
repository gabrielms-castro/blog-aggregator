import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "src/types/rss_feed";

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

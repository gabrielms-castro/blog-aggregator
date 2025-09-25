export interface RSSFeed {
    channel: {
        title: string
        link: string
        description: string
        item: RSSItem[]
    }
}

export interface RSSItem {
    title: string
    link: string
    description: string
    pubDate: string
}
import { fetchFeed } from "src/rss/fetch_feed";

export async function aggHandler(_:string) {
    const feedURL = "https://www.wagslane.dev/index.xml"
    const feedData = await fetchFeed(feedURL)
    const feedStr = JSON.stringify(feedData)
    console.log(feedStr)
}
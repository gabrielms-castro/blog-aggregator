import { getPostsForUser } from "src/lib/db/queries/posts";
import { getUserByName } from "src/lib/db/queries/users";
import { User } from "src/lib/db/schemas/schemas";
import { getCurrentUser } from "src/utils/get_current_user";


export async function browseHandler(_: string, user: User) {
    const currentUser = getCurrentUser() as string
    const userData = await getUserByName(currentUser)
    const userID = userData.id
    const posts = await getPostsForUser(userID)

    console.log(`Found ${posts.length} posts for user ${user.name}`);
    for (let post of posts) {
        console.log(`${post.publishedAt} from ${post.feedName}`);
        console.log(`--- ${post.title} ---`);
        console.log(`    ${post.description}`);
        console.log(`Link: ${post.url}`);
        console.log(`=====================================`);
    }
}

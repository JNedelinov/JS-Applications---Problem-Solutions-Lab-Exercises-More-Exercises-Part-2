import { getPostsByOwnerId   } from "../data.js";

export default async function home() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        post: await this.load('../../templates/posts/post.hbs')
    }

    const ownPosts = await getPostsByOwnerId();

    this.app.userData.posts = ownPosts;

    this.partial('../../templates/home.hbs', this.app.userData);
}
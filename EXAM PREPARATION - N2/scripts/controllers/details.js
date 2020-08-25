import { getPostById } from "../data.js";

export default async function details() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        // details: await this.load('../../templates/posts/details.hbs')
    }

    const postId = this.params.id;

    const post = await getPostById(postId);

    const context = Object.assign(post, this.app.userData);

    this.partial('../../templates/posts/details.hbs', context);
}
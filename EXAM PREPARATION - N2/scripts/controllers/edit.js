import { getPostById, getPostsByOwnerId, editPost } from "../data.js";

export default async function getEdit() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        post: await this.load('../../templates/posts/post.hbs')
    }

    const postId = this.params.id;

    const post = await getPostById(postId);
    const ownPosts = await getPostsByOwnerId();

    this.app.userData.posts = ownPosts;

    const context = Object.assign(post, this.app.userData);

    this.partial('../../templates/posts/edit.hbs', context);
}

export async function postEdit() {
    try {
        const title = this.params.title;
        const category = this.params.category;
        const content = this.params.content;

        if (!/[A-Z]\w+/.test(title)) {
            throw new Error('The title should begin with uppercase letter!');
        }

        if (!/[A-Z]\w+/.test(category)) {
            throw new Error('The category should begin with uppercase letter!');
        }

        const postId = this.params.id;

        const post = { title, category, content };

        const result = await editPost(postId, post);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        // showInfo('Movie created!');

        this.redirect('#/home');
    } catch (error) {
        alert(error.message);
        // showError(error.message);
    }
}
import { getPostById, deletePost } from "../data.js";

export default async function postDelete() {
    const postId = this.params.id;

    const post = this.app.userData.posts.find(post => post.objectId == postId);
    if (post === undefined) {
        post = await getPostById(postId);
    }

    try {
        const result = await deletePost(postId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        // showInfo(`${post.title} deleted successfully!`);

        this.redirect('/');
    } catch (error) {
        alert(error.message);
        // showError(err.message);
    }
}
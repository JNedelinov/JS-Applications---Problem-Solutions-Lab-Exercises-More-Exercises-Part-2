import { createPost } from "../data.js";

export async function create() {
    try {
        const title = this.params.title;
        const category = this.params.category;
        const content = this.params.content;

        if (!title || !category || !content) {
            throw new Error('All fields are required!');
        }

        if (!/[A-Z]\w+/.test(title)) {
            throw new Error('The title should begin with uppercase letter!');
        }

        if (!/[A-Z]\w+/.test(category)) {
            throw new Error('The category should begin with uppercase letter!');
        }

        const creator_email = this.app.userData.email;

        const post = { title, category, content, creator_email };

        const result = await createPost(post);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        // showInfo('Movie created!');

        this.redirect('/');
    } catch (error) {
        alert(error.message);
        // showError(error.message);
    }
}
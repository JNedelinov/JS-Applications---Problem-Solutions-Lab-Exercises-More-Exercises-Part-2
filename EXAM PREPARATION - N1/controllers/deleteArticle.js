import { getArticleById, deleteArticle as apiDelete } from "../data.js";


export default async function deleteArticle() {
    const articleId = this.params.id;

    let article = this.app.userData.articles.find(article => article.objectId == articleId);
    if (article === undefined) {
        article = await getArticleById(articleId);
    }

    try {
        const result = await apiDelete(articleId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.redirect('/');
    } catch(err) {
        alert(err.message);
        return;
    }
}
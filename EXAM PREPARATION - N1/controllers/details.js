import { getArticleById } from "../data.js";


export default async function details() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
    }

    const articleId = this.params.id;
    let article = this.app.userData.articles.find(article => article.objectId == articleId);

    if (article === undefined) {
        article = await getArticleById(articleId);
    }

    let isOwner = false;

    if (article.ownerId == this.app.userData.userId) { isOwner = true; }

    const context = Object.assign({article, isOwner}, this.app.userData);

    this.partial('../templates/detailsPage/details.hbs', context);
}
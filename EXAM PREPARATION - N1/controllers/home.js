import { allArticles, getCategories } from '../data.js';

export default async function home() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        article: await this.load('../templates/article/article.hbs')
    }
    
    if (!this.app.userData.email) {
        this.partial('../templates/home/home.hbs', {});
        return;
    }

    const apiArticles = await allArticles();
    const apiCategories = await getCategories();

    /*

    1. in articles we search for the category
    2. in categories we search for the category
    3. we add the stringified article in articles 
    
    */


    for (let i = 0; i < Object.keys(apiArticles).length; i++) {
        const currArticleCat = apiArticles[i].category;
        for (let j = 0; j < Object.keys(apiCategories).length; j++) {
            const currCategoryCat = apiCategories[j].category;
            if (currCategoryCat !== currArticleCat) { continue; }

            const article = {
                title: apiArticles[i].title,
                content: apiArticles[i].content,
                creator_email: apiArticles[i].creator_email,
                objectId: apiArticles[i].objectId,
            };

            if (!apiCategories[j].articles) { apiCategories[j].articles = []; }

            apiCategories[j].articles.push(article);
            
            break;
        }
    }

    this.app.userData.articles = apiArticles;
    this.app.userData.categories = apiCategories;

    this.partial('../templates/home/home.hbs', this.app.userData);
}
import { getArticleById, editArticle, getCategories } from "../data.js";

export default async function edit() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
    }

    const articleId = this.params.id;
    let article = this.app.userData.articles.find(article => article.objectId == articleId);

    if (article === undefined) {
        article = await getArticleById(articleId);
    }

    const context = Object.assign({ article }, this.app.userData);

    this.partial('../templates/editPage/edit.hbs', context);
}

export async function editPost() {
    try {
        const title = this.params.title;
        let category = this.params.category;
        const content = this.params.content;

        category = makeTheCategoryValid(category);

        const currCategories = await getCategories();
        for (let i = 0; i < currCategories.length; i++) {
            let currCat = currCategories[i].category.toLowerCase();
            if (i + 1 === currCategories.length) {
                if (currCat !== category.toLowerCase()) {
                    throw new Error('Invalid category!\n\nThe only choices are: \nJavaScript;\nC#;\nJava;\nPyton.')
                } else { break; }
            }
            if (currCat !== category.toLowerCase()) { continue; }
            else { break; }
        }

        if (!/[A-Z]\w+/.test(title)) { throw new Error('the title should start with uppercase letter!'); }

        const currClass = setClass(category);

        const article = {
            title,
            category,
            content,
            creator_email: this.app.userData.email,
            class: currClass
            /* ownerId: this.app.userData.objectId */
        };

        const articleId = this.params.id;

        const result = await editArticle(articleId, article);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        this.redirect('/');

    } catch (err) {
        alert(err.message);
        return;
    }
}

function makeTheCategoryValid(category) {
    category = category.toLowerCase();
    if (category === 'js' || category === 'javascript') {
        category = 'JavaScript';
    } else if (category === 'c#' || category === 'csharp' || category === 'c sharp') {
        category = 'C#';
    } else if (category === 'java') {
        category = 'Java';
    } else if (category === 'pyton' || category === 'phyton') {
        category = 'Pyton';
    }

    return category;
}

function setClass(category) {
    switch(category) {
        case 'JavaScript': return 'js';
        case 'c#': return 'CSharp';
        case 'Java': return 'Java';
        case 'Pyton': return 'Pyton';
    }
}
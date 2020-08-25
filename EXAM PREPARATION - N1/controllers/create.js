import { createArticle, getCategories, postCategory } from '../data.js';

export default async function create() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        // create: await this.load('../templates/create/create.hbs'),
    }

    this.partial('../templates/createPage/create.hbs', this.app.userData);
}

export async function createPost() {
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

        if (!/[A-Z]\w+/.test(title)) { throw new Error('the title should start with uppercase letter!'); return; }

        const currClass = setClass(category);

        const article = {
            title,
            category,
            content,
            creator_email: this.app.userData.email,
            class: currClass
            /* ownerId: this.app.userData.objectId */
        };

        const result = await createArticle(article);

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
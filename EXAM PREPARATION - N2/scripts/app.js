import { loginGet, registerGet, registerPost, loginPost, logoutGet } from "./controllers.js/userAuth.js";
import home from "./controllers.js/home.js";
import details from "./controllers.js/details.js";
import { create } from "./controllers.js/create.js";
import getEdit, { postEdit } from "./controllers.js/edit.js";
import postDelete from "./controllers.js/delete.js";

window.addEventListener('load', () => {

    // Array.from(document.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', (e) => e.preventDefault()));

    const app = Sammy('#root', function () {
        // винаги първо зареждаме handlebars със Sammy
        this.use('Handlebars', 'hbs');

        // след това си създаваме обекта, който ще ни помага за зареждането на темплейтите
        this.userData = {
            email: localStorage.getItem('email') || '',
            userId: localStorage.getItem('userId') || '',
            posts: [],
        };

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/login', loginGet);
        this.get('#/register', registerGet);
        this.get('#/logout', logoutGet);

        this.post('#/login', (ctx) => { loginPost.call(ctx); });
        this.post('#/register', (ctx) => { registerPost.call(ctx) });

        this.get('#/details/:id', details);

        this.post('#/create', (ctx) => { create.call(ctx); });

        this.get('#/edit/:id', getEdit);
        this.post('#/edit/:id', (ctx) => { postEdit.call(ctx); });

        this.get('#/delete/:id', postDelete);
    });

    app.run();
})
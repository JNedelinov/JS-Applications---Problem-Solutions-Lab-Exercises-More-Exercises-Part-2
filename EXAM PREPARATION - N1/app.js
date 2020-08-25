import home from './controllers/home.js';
import register, { registerPost } from './controllers/register.js';
import logout from './controllers/logout.js';
import login, { loginPost } from './controllers/login.js';
import create, { createPost } from './controllers/create.js';
import details from './controllers/details.js';
import edit, { editPost } from './controllers/edit.js'
import deleteArticle from './controllers/deleteArticle.js';

(function () {

    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        // user creditentials
        this.userData = {
            email: sessionStorage.getItem('email') || '',
            userId: sessionStorage.getItem('userId') || '',
            categories: [],
            articles: []
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', register);
        this.post('#/register', (ctx) => { registerPost.call(ctx); });

        this.get('#/login', login);
        this.post('#/login', (ctx) => { loginPost.call(ctx); });

        this.get('#/logout', logout);

        this.get('#/create', create);
        this.post('#/create', (ctx) => { createPost.call(ctx); });

        this.get('#/details/:id', details);

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx); });

        this.get('#/delete/:id', deleteArticle);

    })

    app.run();

})()
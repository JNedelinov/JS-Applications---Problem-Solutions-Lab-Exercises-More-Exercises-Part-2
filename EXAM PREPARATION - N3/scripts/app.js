import { loginGet, registerGet, loginPost, registerPost, logoutGet } from './controllers/userAuth.js';
import { home } from './controllers/home.js';
import details from './controllers/details.js';
import createGet, { createPost } from './controllers/create.js';
import editGet, {editPost} from './controllers/edit.js';
import eventDelete from './controllers/delete.js';
import join from './controllers/join.js';
import getProfile from './controllers/profile.js';

window.addEventListener('load', () => {

    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
            events: [],
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

        this.get('#/create', createGet);
        this.post('#/create', (ctx) => { createPost.call(ctx); });

        this.get('#/edit/:id', editGet);
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx); });
        
        this.get('#/delete/:id', eventDelete);
        this.get('#/join/:id', join);
        
        this.get('#/profile', getProfile);
    });

    app.run();
})
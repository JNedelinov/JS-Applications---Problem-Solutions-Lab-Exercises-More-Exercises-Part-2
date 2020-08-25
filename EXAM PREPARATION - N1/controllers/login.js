import {login as apiLogin} from '../data.js';

export default async function login() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
    }

    this.partial('../templates/login/login.hbs');
}

export async function loginPost() {
    try {
        const email = this.params.email;
        const password = this.params.password;

        if (!/\w+@[a-z]+.[a-z]{2,3}/.test(email)) {
            throw new Error('Invalid email address!');
        }

        if (!email || !password) {
            throw new Error('All fields are required!');
        }

        const result = await apiLogin(email, password);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        this.redirect('/');

    } catch(err) {
        alert(err.message);
        return;
    }
}
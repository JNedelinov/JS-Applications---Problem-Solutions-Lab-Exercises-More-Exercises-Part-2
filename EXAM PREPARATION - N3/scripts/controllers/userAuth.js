import { login, register, logout } from '../data.js';
// import {     showInfo, showError } from './notifications.js';

// handling the login and loading the login page

export async function loginGet() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs'),
    }

    this.partial('../../templates/pages/login.hbs', this.app.userData);
}

// sending the login request

export async function loginPost() {
    const username = this.params.username;
    const password = this.params.password;

    try {
        if (!username || !password) {
            throw new Error('All fields are required!');
        }

        const result = await login(username, password);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.username = result.username;
        this.app.userData.userId = result.objectId;

        // showInfo('Successfully logged in!');

        this.redirect('/');
    } catch (err) {
        // showError(err.message);
        console.error(err);
        return;
    }
}

// handling the register and loading the register page

export async function registerGet() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs'),
    }

    this.partial('../../templates/pages/register.hbs', this.app.userData);
}

// sending the register request

export async function registerPost() {
    const username = this.params.username;
    const password = this.params.password;
    const rep_pass = this.params.rePassword;

    try {
        if (!username || !password || !rep_pass) {
            throw new Error('All fields are required!');
        }

        if (password !== rep_pass) {
            throw new Error('Passwords do not match!');
        }

        if (password.length < 6) {
            throw new Error('The password should be at least 6 characters long!');
        }

        const result = await register(username, password);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        const resultLogin = await login(username, password);

        if (resultLogin.hasOwnProperty('errorData')) {
            const error = new Error(resultLogin.errorData);
            Object.assign(error, resultLogin);
            throw error;
        }

        this.redirect('#/home');
    } catch (err) {
        console.error(err);
        return;
    }
}

// handling and sending the logout request

export async function logoutGet() {
    try {
        const result = await logout();

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.username = '';
        this.app.userData.userId = '';
        // this.app.userData.events = [];

        this.redirect('/');
    } catch (err) {
        alert(err.message);
        return;
    }
}
import { register as apiRegister, login } from '../data.js';

export default async function register() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
    }

    this.partial('../templates/register/register.hbs', this.app.userData);
}

export async function registerPost() {
    try {
        const email = (this.params.email).toLowerCase();
        const fPass = this.params.password;
        const sPass = this.params['rep-pass'];

        if (!email || !fPass || !sPass) {
            throw new Error('All fields are required!');
        } 

        if (fPass !== sPass) {
            throw new Error('Passwords do not match!');
        }

        if (!/\w+@[a-z]+.[a-z]{2,3}/.test(email)) {
            throw new Error('Invalid email address!');
        }

        if (fPass.length < 6) {
            throw new Error('The password should be at least 6 characters long!');
        }

        const result = await apiRegister(email, fPass);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error(result.errorData);
            Object.assign(error, result);
            throw error;
        }

        const loginRes = await login(email,fPass);

        this.app.userData.email = loginRes.email;
        this.app.userData.userId = loginRes.objectId;

        this.redirect('/');
    } catch(err) {
        alert(err.message);
        return;
    }
}

/*

    СТЪПКА ПО СТЪПКА ЗА REGISTER-FROM CONTROLLER:

    1. СЪЗДАВАМЕ СИ АСИНХРОННА ФУНКЦИЯ, В КОЯТО ЩЕ РЕНДЕРИРАМЕ:
        1.1. THE PARTIALS
            - THE PARTIALS ги зареждаме чрез this.load(...),
            като задължително трябва да имаме await преди this.load,
            защото самата функция връща promise
        1.2. THE WHOLE PAGE

    2. СЪЗДАВАМЕ СИ ВТОРА АСИНХРОННА ФУНКЦИЯ, В КОЯТО ЩЕ ПРАЩАМЕ ЗАЯВКА
    КЪМ НАШИЯ СЪРВЪР:
        2.1. ПОСТАВЯМЕ СИ ЦЯЛАТА ФУНКЦИОНАЛНОСТ В Try-Catch
        2.2. ПРОВЕРЯВАМЕ ДАЛИ:
            - Паролите съвпадат
            - Имейла е валиден
            - Паролата е поне 6 символа
            - Импортваме register функцията от всикчи api функции
            - Подаваме на api-register fn имейла и паролата,
            като резултата го присвояваме на променлива, за да направим
            последната проверка преди да редиректнем user-a

*/
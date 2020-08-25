/* 

    КЛАС МОДУЛ, КОЙТО ПРИЕМА:
        - app id
        - api key
        - notifications (begin, end)

    КЛАС МОДУЛ, КОЙТО ПРИТЕЖАВА ВСИЧКИ:
        - CRUD OPERATIONS (CREATE, READ, UPDATE, DELETE);
        - LOGIN, REGISTER, LOGOUT OPERATIONS;

*/

export default class API {
    constructor(appId, apiKey, beginRequest, endRequest) {
        this.appId = appId,
            this.apiKey = apiKey;
        this.endpoints = {
            REGISTER: "users/register",
            LOGIN: "users/login",
            LOGOUT: "users/logout",
        };
        this.beginRequest = () => {
            if (beginRequest) {
                beginRequest; // beginRequest()
            }
        };
        this.endRequest = () => {
            if (endRequest) {
                endRequest; // endRequest()
            }
        }
    }

    // host функцията, която ни връща правилния линк за заявка

    host(endpoint) {
        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
    }


    // getOptions ни създава the options used in the fetch

    getOptions(headers) {
        const token = localStorage.getItem('userToken');

        const options = { headers: headers || {} };

        if (token !== null) {
            Object.assign(options.headers, { 'user-token': token });
        }

        return options;
    }

    // CRUD операциите (get, post, put, delete)

    async get(endpoint) {
        const options = this.getOptions();

        let result;

        this.beginRequest();
        if (endpoint !== this.endpoints.LOGOUT) {
            result = (await fetch(this.host(endpoint), options)).json();
            // const result = await (await fetch(this.host(endpoint), options)).json();
        } else {
            result = fetch(this.host(endpoint), options);
        }
        this.endRequest();

        return result;
    }

    async post(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': "application/json" });

        options.method = "POST";
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async put(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': "application/json" });

        options.method = "PUT";
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async delete(endpoint) {
        const options = this.getOptions();

        options.method = "DELETE";

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    // LOGIN/REGISTER/LOGOUT

    async register(email, password) {
        return this.post(this.endpoints.REGISTER, { email, password });
    }

    async login(email, password) {
        const result = await this.post(this.endpoints.LOGIN, { login: email, password });

        localStorage.setItem('userToken', result['user-token']);
        localStorage.setItem('email', result.email);
        localStorage.setItem('userId', result.objectId);

        return result;
    }

    async logout() {
        const result = this.get(this.endpoints.LOGOUT);
        localStorage.clear();
        return result;
    }

}
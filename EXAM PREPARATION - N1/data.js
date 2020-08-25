

function host(endpoint) {
    return `https://api.backendless.com/0D83339B-4588-EBD9-FF53-2378B67FB900/C0CCD756-E90A-44D6-8C1D-BC1084876DA1/${endpoint}`;
}

const endpoints = {
    LOGIN: "users/login",
    REGISTER: "users/register",
    LOGOUT: "users/logout",
    ARTICLES: "data/articles",
    ARTICLE_BY_ID: "data/articles/",
    CATEGORIES: "data/categories"
};

export async function register(email, password) {
    const result = (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })).json();

    return result;
}

export async function login(email, password) {
    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ login: email, password })
    })).json();

    sessionStorage.setItem('userToken', result['user-token']);
    sessionStorage.setItem('userId', result.objectId);
    sessionStorage.setItem('email', result.email);

    return result;
}

export async function logout() {
    const token = sessionStorage.getItem('userToken');

    sessionStorage.clear();

    const result = await fetch(host(endpoints.LOGOUT), {
        headers: {
            "user-token": token
        }
    });

    return result;
}

export async function allArticles() {
    const token = sessionStorage.getItem('userToken');

    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.ARTICLES), {
        headers: {
            "user-token": token
        }
    })).json();

    return result;
}

export async function getArticleById(id) {
    const token = sessionStorage.getItem('userToken');

    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.ARTICLE_BY_ID + id), {
        headers: {
            "user-token": token
        }
    })).json();

    return result;
}

export async function getCategories() {
    const token = sessionStorage.getItem('userToken');

    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.CATEGORIES), {
        headers: {
            "user-token": token
        }
    })).json();

    return result;
}

export async function postCategory(category) {
    const token = sessionStorage.getItem('userToken');
    
    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.CATEGORIES), {
        method: "POST",
        headers: {
            "user-token": token
        },
        body: JSON.stringify(category)
    })).json();

    return result;
}

export async function createArticle(article) {
    const token = sessionStorage.getItem('userToken');

    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.ARTICLES), {
        method: "POST",
        headers: {
            "user-token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
    })).json();

    return result;
}

export async function editArticle(id, article) {
    const token = sessionStorage.getItem('userToken');

    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.ARTICLE_BY_ID + id), {
        method: "PUT",
        headers: {
            "user-token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
    })).json();

    return result;
}

export async function deleteArticle(id) {
    const token = sessionStorage.getItem('userToken');

    if (!token) { alert('sign in first'); return; }

    const result = (await fetch(host(endpoints.ARTICLE_BY_ID + id), {
        method: "DELETE",
        headers: {
            "user-token": token,
        },
    })).json();

    return result;
}
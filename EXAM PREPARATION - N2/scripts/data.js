import API from './api.js';

const endpoints = {
    POSTS: 'data/posts',
    POST_BY_ID: 'data/posts/'
};

const appId = '9C806B46-4148-661A-FF47-CA8DFFF32200';
const apiKey = 'F4F0AC3E-3A97-415B-89FC-299BC13E66A3';

const api = new API(appId,apiKey,endpoints);

export const login = api.login.bind(api);
export const logout = api.logout.bind(api);
export const register = api.register.bind(api);

// get all posts

export async function getPosts() {
    return api.get(endpoints.POSTS);
}

// get post by ID

export async function getPostById(id) {
    return api.get(endpoints.POST_BY_ID + id);
} 

// get posts by ownerId

export async function getPostsByOwnerId() {
    const ownerId = localStorage.getItem('userId');

    return api.get(`${endpoints.POSTS}?where=ownerId%3D%27${ownerId}%27`);
}

// create post

export async function createPost(post) {
    return api.post(endpoints.POSTS, post);
}

// edit post

export async function editPost(id, updatedPost) {
    return api.put(endpoints.POST_BY_ID + id, updatedPost);
}

// delete post

export async function deletePost(id) {
    return api.delete(endpoints.POST_BY_ID + id);
}
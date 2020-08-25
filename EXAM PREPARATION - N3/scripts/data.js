import API from './api.js';
// import { beginRequest, endRequest } from './controllers/notifications.js';

const endpoints = {
    EVENTS: 'data/events',
    EVENT_BY_ID: 'data/events/'
};

const appId = '3D63A352-1A38-24D9-FF5D-E55DC5258C00';
const apiKey = 'DECC8E32-ECF4-4461-95F4-1BBD2EE6B467';

const api = new API(appId, apiKey /* beginRequest */ /* endRequest */);

export const login = api.login.bind(api);
export const logout = api.logout.bind(api);
export const register = api.register.bind(api);

// get all events

export async function getEvents() {
    return api.get(endpoints.EVENTS);
}

// get event by ID

export async function getEventById(id) {
    return api.get(endpoints.EVENT_BY_ID + id);
}

// get event by ownerId

export async function getEventsByOwnerId() {
    const ownerId = localStorage.getItem('userId');

    return api.get(`${endpoints.EVENTS}?where=ownerId%3D%27${ownerId}%27`);
}

// create event

export async function createEvent(event) {
    return api.post(endpoints.EVENTS, event);
}

// edit event

export async function editEvent(id, updatedEvent) {
    return api.put(endpoints.EVENT_BY_ID + id, updatedEvent);
}

// delete event

export async function deleteEvent(id) {
    return api.delete(endpoints.EVENT_BY_ID + id);
}


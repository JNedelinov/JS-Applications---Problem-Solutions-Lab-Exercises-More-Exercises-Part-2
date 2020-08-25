import { deleteEvent } from "../data.js";

export default async function eventDelete() {
    try {
        const eventId = this.params.id;

        const result = await deleteEvent(eventId);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result)
            throw error;
        }

        // notification success

        this.redirect('#/home');
    } catch (error) {
        // notification error
        console.log(error);
    }
}
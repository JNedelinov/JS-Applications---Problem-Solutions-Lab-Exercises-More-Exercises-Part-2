import { getEventById, editEvent } from "../data.js";
import { showInfo, showError } from "./notifications.js";

export default async function join() {
    const eventId = this.params.id;
    
    let event = this.app.userData.events.find(e => e.objectId == eventId);
    if (!event) {
        event = await getEventById(eventId);
    }

    event.interested += 1;

    try {
        const result = await editEvent(eventId,event);
        
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result)
            throw error;
        }

        // notfication success
        showInfo('Successfully joined the event');

        this.redirect(`#/details/${eventId}`);
    } catch (error) {
        // notification error
        showError(error.message);
        console.log(error);
    }
}
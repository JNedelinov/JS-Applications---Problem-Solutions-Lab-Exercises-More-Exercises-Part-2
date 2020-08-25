import { editEvent, getEventById } from "../data.js";

export default async function editGet() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs')
    }

    const eventId = this.params.id;

    let event = this.app.userData.events.find(e => e.objectId == eventId);

    if (event === undefined) {
        event = await getEventById(eventId);
    }

    const context = Object.assign(event, this.app.userData);

    this.partial('../../templates/pages/edit.hbs', context);
}

export async function editPost() {
    try {
        const { name, dateTime, description, imageURL, id } = this.params;

        const eventId = id;

        // validations

        const updatedEvent = { name, dateTime, description, imageURL };

        const result = await editEvent(eventId, updatedEvent);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result)
            throw error;
        }

        // notfication success

        this.redirect(`#/details/${eventId}`);
    } catch (error) {
        // notification error
        console.log(error);
    }
}
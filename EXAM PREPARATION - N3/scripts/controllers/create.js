import { createEvent } from "../data.js";

export default async function createGet() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs')
    }

    this.partial('../../templates/pages/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const { name, dateTime, description, imageURL } = this.params;

        // validations

        const event = { name, dateTime, description, imageURL, organizer: this.app.userData.username };

        const result = await createEvent(event);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result)
            throw error;
        }

        // notfication success

        this.redirect('#/home');
    } catch (error) {
        // notification error
        console.log(error);
    }
}
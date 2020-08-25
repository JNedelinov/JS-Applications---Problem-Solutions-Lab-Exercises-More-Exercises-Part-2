import {getEvents} from '../data.js';

export async function home() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs')
    }

    const events = await getEvents();

    this.app.userData.events = events;

    this.partial('../../templates/pages/home.hbs', this.app.userData);
}
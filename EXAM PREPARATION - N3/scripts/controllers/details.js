import { getEventById } from "../data.js";

export default async function details() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs')
    }

    const eventId = this.params.id;

    // let event = this.app.userData.events.find(e => e.objectId == eventId);
    const event = await getEventById(eventId);

    const isOrganizer = event.organizer === this.app.userData.username;

    const context = Object.assign({ isOrganizer }, event, this.app.userData);

    this.partial('../../templates/pages/details.hbs', context);
}
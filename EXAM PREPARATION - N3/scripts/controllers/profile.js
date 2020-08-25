import { getEventsByOwnerId } from "../data.js";

export default async function getProfile() {
    this.partials = {
        header: await this.load('../../templates/common/header.hbs'),
        footer: await this.load('../../templates/common/footer.hbs')
    }

    const ownedEvents = await getEventsByOwnerId();
    
    const interested = ownedEvents.length;

    const context = Object.assign({ interested, ownedEvents }, this.app.userData);

    this.partial('../../templates/pages/profile.hbs', context);

}
import PlayerInteraction from 'common/playerInteraction';

class Losses extends PlayerInteraction {
    constructor(definition) {
        definition.type = 'Losses';
        super(definition);

        // This part is for the request
        this.ambush = false;
        this.regionId = definition.region;
        this.losses = definition.losses;
        this.targets = definition.targets;

        // This part is for the response
        this.caesarCanCounterattack = false;
        this.removed = definition.removed;
    }
}

export default Losses;
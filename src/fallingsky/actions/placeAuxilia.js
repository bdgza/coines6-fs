import Action from './action';

class PlaceAuxilia extends Action {

    constructor(args) {
        super(args);

        this.factionId = args.factionId;
        this.regionId = args.regionId;
        this.count = args.count;
    }

    doExecute(state) {
        const faction = state.factionsById[this.factionId];
        const region = state.regionsById[this.regionId];
        const count = this.count;

        if(!region.inPlay() || !faction.hasAvailableAuxilia(count)) {
            throw 'Invalid PlaceAuxilia Action';
        }

        region.addPieces(faction.removeAuxilia(count));
        console.log('Placing ' + count + 'x ' + faction.name + ' Auxilia in ' + region.name);
    }

    doUndo(state) {
        const faction = state.factionsById[this.factionId];
        const region = state.regionsById[this.regionId];
        const count = this.count;

        console.log('Taking back ' + count + 'x ' + faction.name + ' Auxilia from ' + region.name);
        const auxilia = _.take(region.getHiddenPiecesForFaction(faction.id), count);
        if(auxilia.length !== count) {
            throw 'Unable to undo PlaceAuxilia Action';
        }
        region.removePieces(auxilia);
        faction.returnAuxilia(auxilia);
    }

    instructions(state) {
        const faction = state.factionsById[this.factionId];
        const region = state.regionsById[this.regionId];
        const count = this.count;
        return ['Place ' + count + 'x ' + faction.name + ' Auxilia in ' + region.name];
    }
}

export default PlaceAuxilia;
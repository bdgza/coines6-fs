import Bot from '../bot';
import _ from '../../../lib/lodash';
import FactionIDs from '../../config/factionIds';
import RegionIDs from '../../config/regionIds';
import GermanicRally from './germanicRally';
import GermanicMarch from './germanicMarch';
import GermanicRaid from './germanicRaid';
import GermanicBattle from './germanicBattle';
import CommandModifiers from '../../commands/commandModifiers';
import MovePieces from '../../actions/movePieces';

class GermanicBot extends Bot {
    constructor() {
        super({factionId: FactionIDs.GERMANIC_TRIBES});
    }

    takeTurn(state) {
        GermanicRally.rally(state, new CommandModifiers({winter: true}));
        GermanicMarch.march(state, new CommandModifiers({winter: true}));
        GermanicRaid.raid(state, new CommandModifiers({winter: true}));
        GermanicBattle.battle(state, new CommandModifiers({winter: true}));
    }

    willHarass(factionId) {
        return true;
    }

    quarters(state) {
        _(state.regions).filter(function(region) {
            return region.devastated();
        }).map((region) => {
            const pieces = region.piecesByFaction()[this.factionId] || [];
            if(pieces.length === 0) {
                return;
            }
            const hasAlly = _.find(pieces, { type : 'alliedtribe'});
            if(!hasAlly) {
                return { region, pieces };
            }
        }).compact().each(function(relocation) {
            const germaniaRegion = state.regionsById[_.sample([RegionIDs.SUGAMBRI, RegionIDs.UBII])];
            MovePieces.execute(state, {startRegionId: relocation.region.id, destRegionId: germaniaRegion.id, pieces: relocation.pieces});
        });
    }
}

export default GermanicBot;
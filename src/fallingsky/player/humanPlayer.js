import FallingSkyPlayer from './fallingSkyPlayer';
import PlayerInteractionNeededError from 'common/playerInteractionNeededError';
import SupplyLineAgreement from 'fallingsky/interactions/supplyLineAgreement';
import QuartersAgreement from 'fallingsky/interactions/quartersAgreement';
import RetreatAgreement from 'fallingsky/interactions/retreatAgreement';
import Harassment from 'fallingsky/interactions/harassment';
import Losses from 'fallingsky/interactions/losses';

class HumanPlayer extends FallingSkyPlayer {
    constructor(definition) {
        super(definition);
    }

    willHarass(factionId, context) {
        throw new PlayerInteractionNeededError('Harassment possible for ' + factionId,
                                               new Harassment({
                                                                  requestingFactionId: factionId,
                                                                  respondingFactionId: this.factionId
                                                              }));
    }

    willAgreeToQuarters(factionId) {
        throw new PlayerInteractionNeededError('Quarters requested by ' + factionId,
                                               new QuartersAgreement({
                                                                         requestingFactionId: factionId,
                                                                         respondingFactionId: this.factionId
                                                                     }));
    }

    willAgreeToRetreat(factionId) {

        throw new PlayerInteractionNeededError('Retreat requested by ' + factionId,
                                               new RetreatAgreement({
                                                                        requestingFactionId: factionId,
                                                                        respondingFactionId: this.factionId
                                                                    }));
    }

    willAgreeToSupplyLine(factionId) {
        throw new PlayerInteractionNeededError('Supply line requested by ' + factionId,
                                               new SupplyLineAgreement({
                                                                           requestingFactionId: factionId,
                                                                           respondingFactionId: this.factionId
                                                                       }));
    }

    willRetreat(state, region, attackingFaction, worstCaseAttackerLosses, noRetreatDefenderResults, retreatDefenderResults) {

    }

    retreatFromBattle(state, region, attackingFaction, defenderResults) {

    }

    takeLosses(state, region, attackingFaction, attackResults, ambush, counterattack) {
        throw new PlayerInteractionNeededError('Losses must be taken from battle with ' + attackingFaction.id,
                                               new Losses({
                                                              requestingFactionId: attackingFaction.id,
                                                              respondingFactionId: this.factionId,
                                                              ambush: ambush,
                                                              counterattack: counterattack,
                                                              regionId: region.id,
                                                              losses: attackResults.losses,
                                                              targets: attackResults.targets
                                                          }));
    }
}

export default HumanPlayer;
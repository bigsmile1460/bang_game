import { PACKET_TYPE } from '../constants/header.js';
import CustomError from '../utils/error/customError.js';
import { gameStartHandler } from './room/gameStart.handler.js';
import { healthCheckHandler } from './healthCheck.handler.js';
// import { useCardHandler } from './card/useCard.handler.js';
// import { positionUpdateHandler } from './game/positionUpdate.handler.js';
// import { reactionHandler } from './game/reaction.handler.js';
// import { destroyCardHandler } from './card/destroyCard.handler.js';
// import { fleaMarketPickHandler } from './game/fleaMarketPick.handler.js';
// import { cardSelectHandler } from './card/cardSelect.handler.js';
// import { passDebuffHandler } from './game/passDebuff.handler.js';

const handlers = {
  [PACKET_TYPE.GAME_START_REQUEST]: { handler: gameStartHandler },
  // [PACKET_TYPE.USE_CARD_REQUEST]: { handler: useCardHandler },
  // [PACKET_TYPE.POSITION_UPDATE_REQUEST]: { handler: positionUpdateHandler },
  // [PACKET_TYPE.REACTION_REQUEST]: { handler: reactionHandler },
  // [PACKET_TYPE.DESTROY_CARD_REQUEST]: { handler: destroyCardHandler },
  // [PACKET_TYPE.FLEA_MARKET_PICK_REQUEST]: { handler: fleaMarketPickHandler },
  // [PACKET_TYPE.CARD_SELECT_REQUEST]: { handler: cardSelectHandler },
  // [PACKET_TYPE.PASS_DEBUFF_REQUEST]: { handler: passDebuffHandler },
  [PACKET_TYPE.HEALTHCHECK_REQUEST]: {handler: healthCheckHandler}
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    throw new CustomError(`핸들러를 찾을 수 없음: ${packetType}`);
  }

  return handlers[packetType].handler;
};

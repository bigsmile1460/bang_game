import { PACKET_TYPE } from '../constants/header.js';
import { createResponse } from '../utils/response/createResponse.js';
import { socketManager } from '../classes/manager/socketManager.js';
import { addUser } from '../sessions/user.session.js';
import { findGameById } from '../sessions/game.session.js';

// 유저 세션 추가 작업 진행
// gameSession에 이미 로비서버로부터 받은 게임세션은 저장된 상태태
export const healthCheckHandler = (socket, payload) => {
  const { jwt, roomId } = payload.healthCheckRequest;
  const currentGame = findGameById(roomId);
  const getToken = socketManager.getSocket(jwt);
  let response;
  if (!getToken) {
    socketManager.addSocket(jwt, socket);
    socket.jwt = jwt;
    //게임 클래스 내에 있는 유저들 중 내 jwt와 일치하는 데이터 추가
    const currentUser = currentGame.findInGameUserByJwt(jwt);
    // 새로운 소켓으로 덮어 씌우기
    currentUser.socket = socket;
    addUser(currentUser);
    response = {
      healthCheckResponse: {
        success: true,
      },
    };
  } else {
    response = {
      healthCheckResponse: {
        success: false,
      },
    };
  }

  socket.write(createResponse(PACKET_TYPE.HEALTHCHECK_RESPONSE, 0, response));
};

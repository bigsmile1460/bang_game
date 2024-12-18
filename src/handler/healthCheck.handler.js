import { PACKET_TYPE } from '/../constants/header.js';
import { createResponse } from '/../utils/response/createResponse.js';
import jwt from 'jsonwebtoken';
import { socketManager } from '../classes/manager/socketManager.js';

export const healthCheckHandler = (socket, payload) => {
    socketManager.addSocket(payload.jwt, socket);

    const getToken = socketManager.getSocket(payload.jwt);
    let response;
    if (getToken){
        response = {
            healthCheckResponse: {
                success: true
            }
        }
    }
    else{
        response = {
            healthCheckResponse: {
                success: false
            }
        }
    }

    socket.write(createResponse(PACKET_TYPE.HEALTHCHECK_RESPONSE, 0, response))
}

import jwt from 'jsonwebtoken';
import RedisManager from '../classes/manager/redis.manager.js';
import { config } from '../config/config.js';
import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';
import { findUserByJwt } from '../sessions/user.session.js';

// export const onConnection = (socket) => {
//   console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//   socket.buffer = Buffer.alloc(0);

//   socket.on('data', onData(socket));
//   socket.on('end', onEnd(socket));
//   socket.on('error', onError(socket));
// };

export const onConnection = async (socket) => {
  console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0);
  // JWT 생성 (IP와 포트를 사용하여 JWT 생성)

  // const jwtToken = jwt.sign({ id:`${socket.remoteAddress}:${socket.remotePort}` }, config.jwt.SCRET_KEY,{noTimestamp:true});
  // socket.jwt = jwtToken;
  // const currentUser = findUserByJwt(jwtToken);
  // currentUser.socket = socket; 

  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};

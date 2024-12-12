import RedisManager from '../classes/manager/redis.manager.js';
import { gameStartHandler } from '../handler/room/gameStart.handler.js';
import { loadProto } from './loadProtos.js';

const initServer = async () => {
  try {
    await loadProto();
    const redis = RedisManager.getInstance();

    await redis.subscribe('lobby');
    //유저 정보 등록
    const parsedMessage = redis.onGameStart();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;

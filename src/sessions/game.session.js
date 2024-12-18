import Game from '../classes/model/game.class.js';
import User from '../classes/model/user.class.js';
import CharacterData from '../classes/model/characterData.class.js';
import { plainToInstance } from 'class-transformer';
import { gameSession } from './session.js';
import { addUser } from './user.session.js';

// 새 게임 세션 대신 기존 json형태의 게임 객체를 복원하고 넣어주는 역할할
// roomData << raw 객체체
export const addGameSession = (roomData) => {
    let users = [];
    roomData.users.forEach((user) => {
      user.characterData.handCards = new Map(Object.entries(user.characterData.handCards));
      user.characterData = plainToInstance(CharacterData, user.characterData);
      const newUser = plainToInstance(User, user);
      users.push(newUser);
      addUser(newUser);
    });
    const room = plainToInstance(Game, roomData);
    room.users = users;

  gameSession.push(room);
  return room;
};

export const removeGameSession = (gameId) => {
  const index = gameSession.findIndex((game) => game.id === gameId);
  // 못 찾은 경우
  if (index === -1) {
    console.error('게임을 찾지 못했습니다.');
    return null;
  }

  const game = gameSession.splice(index, 1)[0];
  if (game) {
    game.release();
  }

  return game;
};

export const findGameById = (gameId) => {
  const index = gameSession.findIndex((game) => game.id === gameId);
  if (index !== -1) {
    return gameSession[index];
  }
};

export const joinGameSession = (gameId, user) => {
  const index = gameSession.findIndex((game) => game.id === gameId);
  // 못 찾은 경우
  if (index === -1) {
    console.error('게임을 찾지 못했습니다.');
    return null;
  }
  gameSession[index].users.push(user);

  return gameSession[index];
};

export const getAllGameSessions = () => {
  return gameSession;
};

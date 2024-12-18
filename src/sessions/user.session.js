import { userSession } from "./session.js";

export const addUser = (user) => {
  userSession.push(user);
};

export const findUserByJwt = (jwt) => {
  return userSession.find((user) => user.socket.jwt === jwt);
};

export const removeUser = (socket) => {
  const index = userSession.findIndex((user) => user.socket === socket);
  // 못 찾은 경우
  if (index === -1) {
    console.error('유저를 찾지 못했습니다.');
    return null;
  }

  return userSession.splice(index, 1)[0];
};

export const findUserById = (id) => {
  return userSession.find((user) => user.id === id);
};

export const getUserBySocket = (socket) => {
  return userSession.find((user) => user.socket === socket);
};

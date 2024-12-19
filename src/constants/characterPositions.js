import RedisManager from "../classes/manager/redis.manager.js";

let characterPositions;

export const setCharacterPositions = async () => {
    characterPositions = await RedisManager.getInstance().get('position');
}

export const getCharacterPositions = () => {
    return characterPositions;
}
export default characterPositions;
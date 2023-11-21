import client from "../config/redis";

export const registerCamera = (socketId: string, data: string) => client.HSET("cameras", socketId, data);

export const getAllCameras = () => client.HGETALL('cameras');

export const getCameraBySocketId = (socketId: string) => client.HGET("cameras", socketId);

export const deleteCamera = (socketId: string) => client.HDEL('cameras', socketId);
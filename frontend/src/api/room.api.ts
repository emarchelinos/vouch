import { getAxiosInstance } from '.';

export interface IJoinRoomPayload {
  username: string
  roomId: string
}

export interface ISendMessagePayload {
  text: string
}

export const checkDuplicateName = async (username: string, roomId: string) => {
  const api = getAxiosInstance();
  const response = await api.post(`rooms/${roomId}/users/check-duplicate`, {username});
  return response.data.data.isDuplicated;
};

export const joinRoom = async (username: string, roomId:string) => {
  const api = getAxiosInstance();
  const response = await api.post(`rooms/${roomId}/join`, {username});
  return response.data.data;
};

export const sendMessage = async (roomId:string, username:string, text:string) => {
  const api = getAxiosInstance();
  const response = await api.post(`rooms/${roomId}/message`, {username, text, createdAt: new Date()});
  return response.data;
};

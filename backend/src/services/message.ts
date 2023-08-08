import { IMessage } from "../entities/message";
import { io } from "../sockets";

export const broadcastMessage = (roomId: string, message:IMessage) => {
    io.to(roomId).emit("broadcastMessage", message);
    console.log(`Broadcasting message to ${roomId}`, message);
}
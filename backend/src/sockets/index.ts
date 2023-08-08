import { Server } from 'socket.io';
import { IMessage } from '../entities/message';

interface ServerToClientEvents {
    heartbeat: () => void;
    broadcastMessage: (message: IMessage) => void
}

export const io = new Server<
        ServerToClientEvents
    >({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connection");
    const query = socket.handshake.query;
    const roomId = query.roomId;
    if(!roomId) {
        return
    }
    socket.join(roomId as string);
    console.log(`Client join room ${roomId as string}`);
});
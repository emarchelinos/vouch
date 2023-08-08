import { io } from 'socket.io-client';

const URL = 'http://localhost:4001';

export const socket = io(URL, {
  autoConnect: false,
});

function onConnect() {
    console.log("Connected")
}

function onDisconnect() {
  console.log("Disconnected")

}

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
import { ChatRoom } from "../entities/chatRoom";

export const isUserInChatRoom = async (username: string, roomName: string) => {
    const chatRoom = await ChatRoom.findOne({ name: roomName });

    const user = chatRoom?.users.find((user) => {
        return user.username == username
    })

    const isUsernameExists = user !== undefined
    
    return isUsernameExists;
}
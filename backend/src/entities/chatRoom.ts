import { Model, Schema, Types, model } from "mongoose";
import { IActiveUser, activeUserSchema } from "./activeUser";
import { IMessage, messageSchema } from "./message";

export interface IChatRoom {
    users       : IActiveUser[],
    messages    : IMessage[],
    name        : string
}

type ChatRoomProps = {
    users: Types.DocumentArray<IActiveUser>;
    messages: Types.DocumentArray<IMessage>;
    name: String
  };
  
type ChatRoomType = Model<IChatRoom, {}, ChatRoomProps>;

export const ChatRoom = model<IChatRoom, ChatRoomType>(
    'ChatRoom', 
    new Schema<IChatRoom, 
    ChatRoomType>
({
    users: [activeUserSchema],
    messages: [messageSchema],
    name    : { type: String, required: true }
}));
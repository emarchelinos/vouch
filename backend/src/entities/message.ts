import { Schema, model } from "mongoose";

export interface IMessage {
    username    : string
    text        : string
    createdAt   : string
}

export const messageSchema = new Schema<IMessage>({
    username: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: String, required: true },
});
  
export const Message = model<IMessage>('Message', messageSchema);
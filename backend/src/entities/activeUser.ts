import { Schema, model } from "mongoose";

export interface IActiveUser {
    username: string;
}

export const activeUserSchema = new Schema<IActiveUser>({
    username: { type: String, required: true }
});
  
export const ActiveUser = model<IActiveUser>('ActiveUser', activeUserSchema);
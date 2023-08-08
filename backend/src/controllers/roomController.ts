import { ActiveUser } from "../entities/activeUser";
import { ChatRoom } from "../entities/chatRoom";
import { Message } from "../entities/message";
import * as ChatRoomService from "../services/chatRoom";
import * as MessageService from "../services/message";
import { IResponse } from "../types/common";
import {  Request, Response } from 'express';

export const checkDuplicateUsername = async function(req: Request, res: Response) {
    const roomId = req.params.roomId;
    const username = req.body.username;

    const isUsernameDuplicated = await ChatRoomService.isUserInChatRoom(username, roomId);

    const response: IResponse = {
        message : "Successfully check user duplication",
        data    : {
            isDuplicated: isUsernameDuplicated
        }
    }

    res.status(200).json(response)
}

export const joinRoom = async function(req: Request, res: Response) {
    const roomId = req.params.roomId;
    const username = req.body.username;

    let chatRoom = await ChatRoom.findOne({name: roomId});

    if(chatRoom === null) {
        chatRoom = new ChatRoom({name: roomId})
        await chatRoom.save();
    }

    const newUser = new ActiveUser({username});

    chatRoom.users.push(newUser);
    await chatRoom?.save()

    res.status(200).json({
        message: "Successfully join a room",
        data: chatRoom
    })
}

export const sendMessage = async function(req:Request, res:Response) {
    const roomId = req.params.roomId;
    const username = req.body.username;
    const text = req.body.text;
    const createdAt = req.body.createdAt;


    const chatRoom = await ChatRoom.findOne({name: roomId});

    if(chatRoom === null) {
        res.status(422).json({
            message: "Invalid payload",
            data: null
        })
    }

    const newMessage = new Message({username, text, createdAt});

    chatRoom?.messages.push(newMessage);
    await chatRoom?.save()

    MessageService.broadcastMessage(roomId, newMessage);

    res.status(200).json({
        message: "Successfully send message",
        data: newMessage
    })
}
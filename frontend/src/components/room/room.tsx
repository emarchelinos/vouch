import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {  SCREENS, currentScreenState, messageHistoryState, roomIdState, usernameState } from "../../states/recoil";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { IMessage } from "../../types/entities.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISendMessagePayload, sendMessage } from "../../api/room.api";
import { InputText } from "../commons/inputText";
import { Chat, MessageDirection } from "../commons/chat";

const AlwaysScrollToBottom = () => {
    const elementRef = useRef<null | HTMLDivElement>(null); 

    useEffect(() => elementRef?.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };


export const InRoomScreen:React.FC = () => {

    const username = useRecoilValue(usernameState)
    const roomId = useRecoilValue(roomIdState)
    const setCurrentScreen = useSetRecoilState(currentScreenState)
    const [messageHistory, setMessageHistory] = useRecoilState(messageHistoryState)
    const { register, handleSubmit, resetField } = useForm<ISendMessagePayload>();

    const onSubmit: SubmitHandler<ISendMessagePayload> = async (data) => {
        try {
            if(roomId && username) {
                await sendMessage(roomId, username, data.text);
                const temp = [...messageHistory, {text: data.text, username, createdAt: ''}];
                setMessageHistory(temp);
                resetField('text', {
                    defaultValue: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const onNewMessage = function(data: IMessage) {
            const temp = [...messageHistory, data];
            setMessageHistory([])
            setMessageHistory(temp);
            data = {...data, text:''}
        }

        const socket = io('http://localhost:4001', {
            autoConnect: false,
            query: {roomId}
        });
        socket.connect()
        socket.on("broadcastMessage",onNewMessage)

        return () => {
            socket.off('broadcastMessage', onNewMessage);
        };
    }, [messageHistory,setMessageHistory, roomId])

    return (
    <div className="flex flex-col justify-between" style={{minHeight:'612px', maxHeight:'612px'}}>
        <div className="flex flex-col space-y-4">
            <div className="flex justify-between ml-6 mt-6 mr-6">
                <h1 className="text-xs" onClick={() => setCurrentScreen(SCREENS.LOBBY)}>Exit</h1>
                <h1 className="text-xs" >Welcome, {username}</h1>
            </div>
            <div className="flex justify-center">
                <h1 className="text-2xl">{roomId}</h1>
            </div>
            <div className="flex m-6 flex-col overflow-y-auto" style={{maxHeight:'420px'}}>
                <div className="flex flex-col space-y-3">
                    {messageHistory.map((message) => {
                        return (
                        message.username === username ?
                            <Chat message={message} direction={MessageDirection.OUT} /> : 
                            <Chat message={message} direction={MessageDirection.IN} />
                        )}
                    )}
                <AlwaysScrollToBottom />
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-row justify-between m-6">
                <div className="flex">
                    <InputText
                        className="bg-gray-100 px-4 py-3 rounded-full border-gray-300 w-64" 
                        properties={{
                            placeholder:"Message here . . .",
                            ...register("text", {required:true})
                        }}
                    />
                </div>
                <div className="flex">
                    <input type="submit" value="Send"
                        className=" px-4 py-3 rounded-full text-slate-50 "
                        style={{backgroundColor: '#5DB075'}}
                    />
                </div>
            </div>
        </form>
    </div>
    );
}
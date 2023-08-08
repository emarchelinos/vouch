import { useForm, SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { SCREENS, currentScreenState, messageHistoryState, roomIdState, usernameState } from "../../states/recoil";
import { IJoinRoomPayload, checkDuplicateName, joinRoom } from "../../api/room.api";
import { useState } from "react";
import { InputText } from "../commons/inputText";
import { ErrorMessage } from "../commons/errorMessage";

export const LobbyScreen:React.FC = () => {
    const setCurrentScreen = useSetRecoilState(currentScreenState)
    const setUsername = useSetRecoilState(usernameState)
    const setMessageHistory = useSetRecoilState(messageHistoryState)
    const setRoomId = useSetRecoilState(roomIdState)
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<IJoinRoomPayload>();

    const onSubmit: SubmitHandler<IJoinRoomPayload> = async (data) => {
        try {
            const isDuplicated = await checkDuplicateName(data.username, data.roomId)
            if(!isDuplicated) {
                const result = await joinRoom(data.username, data.roomId)
                setMessageHistory(result.messages);
                setCurrentScreen(SCREENS.INROOM)
                setUsername(data.username)
                setRoomId(data.roomId)
                setErrorMessage("")
            } else {
                setErrorMessage("User is taken!")
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-center m-6">
                    <h1 className="text-2xl">Join ChatRoom</h1>
                </div>

                <div className="flex justify-center">
                    <InputText 
                        properties={{
                            placeholder: 'Username', 
                            ...register("username", {required:true})
                        }}
                    />
                </div>

                <div className="flex justify-center">
                    <InputText 
                        properties={{
                            placeholder: 'Room Id', 
                            ...register("roomId", {required:true})
                        }}
                    />
                </div>

                <div className="flex justify-center">
                    <input type="submit" value="JOIN" className="px-4 py-3 rounded-full w-72 text-slate-50" style={{backgroundColor: '#5DB075'}}/>
                </div>
                <div className="flex flex-col justify-center">
                    {errorMessage.length > 0 ? <ErrorMessage message={errorMessage} />  : <></>}
                    {errors.username && <ErrorMessage message="Please fill in the Username" /> }
                    {errors.roomId &&  <ErrorMessage message="Please fill in the Room Id" /> }
                </div>
            </div>
        </form>
    );
}
import { IMessage } from "../../types/entities.types";

export enum MessageDirection {
    IN = "in",
    OUT = "out"
}

interface IProps {
    message: IMessage;
    direction: MessageDirection
  }

export const Chat:React.FC<IProps> = (props:IProps) => {
    const {message, direction} = props

    return (
            direction === MessageDirection.OUT ?
            <div className="flex flex-row justify-end ">
                <div className="flex text-slate-100 text-sm max-w-[85%] rounded-lg p-3" style={{backgroundColor: '#5DB075'}}>
                    <p key={message.text}>{message?.text}</p>
                </div>
            </div> : 
            <div className="flex flex-col justify-start  ">
                <div className="flex text-sm text-slate-400">
                    <p key={message.username}>{message?.username}</p>
                </div>
                <div className="flex bg-slate-100 text-sm max-w-[85%] rounded-lg p-3">
                    <p key={message.text}>{message?.text}</p>
                </div>
            </div>
    )
}
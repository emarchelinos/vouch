import { atom } from 'recoil';
import { IMessage } from '../types/entities.types';

export enum SCREENS {
    LOBBY = "lobby",
    INROOM = "in-room"
}

export const currentScreenState = atom<SCREENS>({
  key: 'state/screen',
  default: SCREENS.LOBBY,
});

export const usernameState = atom<string | undefined>({
    key: 'state/username',
    default: '',
});

export const roomIdState = atom<string | undefined>({
    key: 'state/roomId',
    default: '',
});

export const messageHistoryState = atom<IMessage[]>({
    key: 'state/message-history',
    default: []
});
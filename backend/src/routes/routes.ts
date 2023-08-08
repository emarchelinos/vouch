import express from 'express';
import * as RoomController from '../controllers/roomController'
import * as Middlewares from './middlewares';

export const router = express.Router()

router.use(Middlewares.logger)

router.post('/rooms/:roomId/users/check-duplicate', RoomController.checkDuplicateUsername);
router.post('/rooms/:roomId/join', RoomController.joinRoom);
router.post('/rooms/:roomId/message', RoomController.sendMessage);

router.use(Middlewares.errorHandler)
router.get('*', Middlewares.notFoundHandler)
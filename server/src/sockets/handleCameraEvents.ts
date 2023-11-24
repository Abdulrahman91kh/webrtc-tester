import {Socket} from 'socket.io';
import { EVENTS, EmitEvents, ListenEvents } from './events.types';
import { SocketServer } from '../types/sockets.types';
import { getAllCamerasNames, registerNewCamera } from '../services/cameras';

const handleCameraEvents = (io: SocketServer, socket: Socket<ListenEvents, EmitEvents>) => {
	socket.on(EVENTS.NEW_CONNECTION, async (data) => {
		await registerNewCamera(socket.id, data);
		const cameras = await getAllCamerasNames();
		io.emit(EVENTS.GET_CAMERAS_RES, cameras);
	});

	socket.on(EVENTS.ANSWER_CONNECTION, (data) => {
		const { testerId, signal } = data
		io.to(testerId).emit(EVENTS.ANSWER_CONNECTION, signal);
	});
};

export default handleCameraEvents;
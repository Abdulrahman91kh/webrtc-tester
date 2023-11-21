import {Socket} from 'socket.io';
import { EVENTS } from './events.types';
import { SocketServer } from '../types/sockets.types';
import { getAllCameras, registerNewCamera } from '../services/cameras';

const handleCameraEvents = (io: SocketServer, socket: Socket) => {
	socket.on(EVENTS.NEW_CONNECTION, async (data) => {
		await registerNewCamera(socket.id, data);
		const cameras = await getAllCameras();
		io.emit(EVENTS.GET_CAMERAS_RES, cameras);
	});

	socket.on(EVENTS.ANSWER_CONNECTION, ({signal, testerId}) => {
		io.to(testerId).emit(EVENTS.ANSWER_CONNECTION, signal);
	});
};

export default handleCameraEvents;
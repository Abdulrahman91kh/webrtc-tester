import {Socket} from 'socket.io';
import { EVENTS, EmitEvents, ListenEvents, SocketServer } from '../types/sockets.types';
import { getAllCamerasNames, registerNewCamera } from '../services/cameras.services';
import { CameraDataTesterType } from '../types/camera.types';


export const errorHandler = async (
	io: SocketServer,
	fn: () => Promise<CameraDataTesterType[] | CameraDataTesterType>,
	testerId?: string
) => {
	try {
		return await fn();
	}
	catch(error) {
		if(testerId){
			io.to(testerId).emit(EVENTS.ERROR_HAPPENED, String(error) );
			return;
		}
		console.error(error);
	}
};

const handleCameraEvents = (io: SocketServer, socket: Socket<ListenEvents, EmitEvents>) => {
	socket.on(EVENTS.NEW_CONNECTION, async (data) => {
		
		const cameras = (await errorHandler(
			io,
			async () => {
				await registerNewCamera(socket.id, data);
				return await getAllCamerasNames();
			}
		) ) as CameraDataTesterType[];

		io.emit(EVENTS.GET_CAMERAS_RES, cameras);

	});

	socket.on(EVENTS.ANSWER_CONNECTION, (data) => {
		const { testerId, signal } = data
		io.to(testerId).emit(EVENTS.ANSWER_CONNECTION, signal);
	});
};

export default handleCameraEvents;
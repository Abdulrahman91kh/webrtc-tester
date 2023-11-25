import { Socket } from "socket.io";
import { getAllCamerasNames, getCameraByNamePassword } from "../services/cameras.services";
import { EVENTS, EmitEvents, ListenEvents, SocketServer } from "../types/sockets.types";
import { CameraDataTesterType } from "../types/camera.types";

export const errorHandler = async (
	socket: Socket<ListenEvents, EmitEvents>,
	fn: () => Promise<CameraDataTesterType[] | CameraDataTesterType>
) => {
	try {
		return await fn();
	}
	catch(error) {
		socket.emit(EVENTS.ERROR_HAPPENED, String(error) );
	}
};

const handleTesterEvents = (io: SocketServer, socket: Socket<ListenEvents, EmitEvents>) => {
	
	socket.on(EVENTS.GET_CAMERAS_REQ, async () => {

		const cameras = await  errorHandler(socket, getAllCamerasNames);
		
		io.to(socket.id).emit(EVENTS.GET_CAMERAS_RES, cameras as CameraDataTesterType[]);

	});

	socket.on(EVENTS.OFFER_CONNECTION, async (data) => {

		const { name, password } = data;
		const camera = ( await errorHandler(
			socket,
			() => getCameraByNamePassword(name, password)
		) ) as CameraDataTesterType;
		
		io.to(camera?.socketId).emit(EVENTS.OFFER_CONNECTION, {...data, testerId: socket.id});
		
	});
};
export default handleTesterEvents  
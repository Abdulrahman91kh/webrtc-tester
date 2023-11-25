import { Socket } from "socket.io";
import { EVENTS, EmitEvents, ListenEvents } from "./events.types";
import { getAllCameras, getAllCamerasNames } from "../services/cameras";
import { SocketServer } from "../types/sockets.types";

const handleTesterEvents = (io: SocketServer, socket: Socket<ListenEvents, EmitEvents>) => {
	
	socket.on(EVENTS.GET_CAMERAS_REQ, async () => {
		const cameras = await getAllCamerasNames();
		io.to(socket.id).emit(EVENTS.GET_CAMERAS_RES, cameras);
	});

	socket.on(EVENTS.OFFER_CONNECTION, async (data) => {
		const { name, password } = data;
		const cameras = await getAllCameras();
		const camera = cameras.find(c => c.name === name);
		if(password === camera.password) {
			socket.emit(EVENTS.ERROR_HAPPENED, "Camera Authentication Failed!");
			return;
		}
		// Establish secure connection using camera credentials
		io.to(camera?.socketId).emit(EVENTS.OFFER_CONNECTION, {...data, testerId: socket.id});
	});
};
export default handleTesterEvents  
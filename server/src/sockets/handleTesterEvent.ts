import { Socket } from "socket.io";
import { EVENTS } from "./events.types";
import { getAllCameras } from "../services/cameras";

const handleTesterEvents = (io: any, socket: Socket) => {
	socket.on(EVENTS.GET_CAMERAS_REQ, async () => {
		const cameras = await getAllCameras();
		io.to(socket.id).emit(EVENTS.GET_CAMERAS_RES, cameras);
	});
	socket.on(EVENTS.OFFER_CONNECTION, async (data) => {
		const cameras = await getAllCameras();
		const camera = cameras.find(c => c.name === data.name);
		io.to(camera?.socketId).emit(EVENTS.OFFER_CONNECTION, {...data});
	});
};
export default handleTesterEvents;
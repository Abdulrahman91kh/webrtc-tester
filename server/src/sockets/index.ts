import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import handleCameraEvents from "./handleCameraEvents";
import { EmitEvents, ListenEvents } from "./events.types";
import { deleteCamera } from "../storage/cameras";
import handleTesterEvents from "./handleTesterEvent";



const handleSocketClose = (socket: Socket) => {
	socket.conn.on('close', async () => {
		await deleteCamera(socket.id);
	});
};

const connectSocket = (server: HttpServer) => {
	const io = new Server<ListenEvents, EmitEvents>(server, {
		cors: { origin: "*" },
		connectionStateRecovery: {
			maxDisconnectionDuration: 2 * 60 * 1000,
		},
	});

	io.on("connection", (socket) => {
		handleCameraEvents(io, socket);
		handleTesterEvents(io, socket);
		handleSocketClose(socket);
	});
};

export default connectSocket
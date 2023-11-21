import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import handleCameraEvents from "./handleCameraEvents";
import { EmitEvents, ListenEvents } from "./events.types";
import { deleteCamera } from "../storage/cameras";



const handleSocketClose = (socket: any) => {
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
		handleSocketClose(socket);
	});
};

export default connectSocket
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import handleCameraEvents from "./handleCameraEvents";
import { deleteCamera } from "../storage/cameras";
import handleTesterEvents from "./handleTesterEvent";
import { EmitEvents,  ErrorHandlerArgsType,  ListenEvents, } from "../types/sockets.types";



const handleSocketClose = (socket: Socket) => {
	socket.conn.on('close', async () => {
		await deleteCamera(socket.id);
	});
};

const eventsErrorHandler = ({
	io, socket, fn
}: ErrorHandlerArgsType) => {
	try {
		fn(io, socket);
	}
	catch(error) {
		console.log(error);
	}
};

const connectSocket = (server: HttpServer) => {
	const io = new Server<ListenEvents, EmitEvents>(server, {
		cors: { origin: "*" },
		connectionStateRecovery: {
			maxDisconnectionDuration: 2 * 60 * 1000,
		},
	});

	io.on("connection", (socket) => {
		eventsErrorHandler({
			io,
			socket,
			fn: handleCameraEvents
		});
		eventsErrorHandler({
			io,
			socket,
			fn: handleTesterEvents
		});
		handleSocketClose(socket);
	});
};

export default connectSocket
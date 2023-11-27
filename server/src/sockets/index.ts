import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import handleCameraEvents from "./handleCameraEvents";
import { deleteCamera } from "../storage/cameras";
import handleTesterEvents from "./handleTesterEvent";
import { EVENTS, EmitEvents,  ErrorHandlerArgsType,  ListenEvents, SocketServer, } from "../types/sockets.types";
import { getAllCamerasNames } from "../services/cameras.services";


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

const handleSocketClose = (io: SocketServer, socket: Socket) => {
	socket.conn.on('close', async () => {
		
		eventsErrorHandler({
			io,
			socket,
			fn: async () => {

				await deleteCamera(socket.id);
				const names = await getAllCamerasNames();
				io.emit(EVENTS.GET_CAMERAS_RES, names);
				
			}
		});

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

		handleSocketClose(io, socket);
		
	});
};

export default connectSocket
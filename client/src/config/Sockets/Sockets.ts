import { Socket, io } from "socket.io-client";
import { BACKEND_ENDPOINT } from "../config";
import { EmitEvents, ListenEvents } from "../../types/Sockets.type";

const socket: Socket<ListenEvents, EmitEvents> = io(BACKEND_ENDPOINT);

export default socket;
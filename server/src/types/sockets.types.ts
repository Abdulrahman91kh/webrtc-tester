import { Server } from "socket.io";
import { EmitEvents, ListenEvents } from "../sockets/events.types";

export type SocketServer = Server<ListenEvents, EmitEvents>


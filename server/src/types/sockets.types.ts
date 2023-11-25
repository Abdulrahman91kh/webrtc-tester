import { Server } from "socket.io";
import { EmitEvents, ListenEvents } from "../sockets/events.types";
import SimplePeer from "simple-peer";

export type SocketServer = Server<ListenEvents, EmitEvents>

export interface AnswerDataType {
	signal: SimplePeer.SignalData;
	testerId: string;
}
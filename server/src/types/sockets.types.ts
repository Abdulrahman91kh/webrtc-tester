import { Server, Socket } from "socket.io";
import SimplePeer from "simple-peer";
import { SignalData } from "simple-peer";
import { CameraDataTesterType, CamerasIncomingDataType } from "./camera.types";

export enum EVENTS {
	NEW_CONNECTION = 'NEW_CONNECTION',
	OFFER_CONNECTION = 'OFFER_CONNECTION',
	ANSWER_CONNECTION = "ANSWER_CONNECTION",
	GET_CAMERAS_REQ = "GET_CAMERAS_REQ",
	GET_CAMERAS_RES = "GET_CAMERAS_RES",
	ERROR_HAPPENED = "ERROR_HAPPENED",
}

export interface ListenEvents {
	OFFER_CONNECTION: (data: OfferConnectionType) => void;
	ANSWER_CONNECTION: (data: AnswerDataType) => void;
	NEW_CONNECTION: (data: CamerasIncomingDataType) => void;
	GET_CAMERAS_REQ: () => void;
}

interface OfferConnectionType {
	name: string;
	testerId: string;
	signal: SignalData;
	password: string;
}

export interface EmitEvents {
	OFFER_CONNECTION: (data: OfferConnectionType) => void;
	ANSWER_CONNECTION: (signal: SignalData) => void;
	GET_CAMERAS_RES: (cameras: CameraDataTesterType[]) => void;
	ERROR_HAPPENED: (message: string) => void;
}

export type SocketServer = Server<ListenEvents, EmitEvents>

export interface AnswerDataType {
	signal: SimplePeer.SignalData;
	testerId: string;
}

export interface ErrorHandlerArgsType {
	fn: (data: any, data2: any) => void;
	io: SocketServer;
	socket: Socket<ListenEvents, EmitEvents>;
};
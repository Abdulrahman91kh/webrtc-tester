import SimplePeer, { SignalData } from "simple-peer";
import { WebRTCStatus } from "./Tester.type";

export enum ServersToConnect {
	LOCAL = "Local",
	STUN = "STUN",
	TURN = "TURN"
}

export interface SimplePeerTypePC extends SimplePeer.Instance {
	_pc: RTCPeerConnection;
	iceGatheringState: RTCIceGatheringState
} 

export interface IceServerType {
	urls: string;
	username?: string;
	password?: string;
}

export enum CandidateGathering {
	STARTED = WebRTCStatus.GATHERING_CANDIDATES,
	COMPLETED = WebRTCStatus.GATHERING_COMPLETED,
	NOT_STARTED = WebRTCStatus.NOT_CONNECTED
}

export interface OfferConnectionEmitType {
	name: string;
	signal: SignalData;
}
export interface OfferConnectionListenType {
	name: string;
	testerId: string;
	signal: SignalData;
}
export interface AnswerType {
	testerId: string;
	signal: SignalData;
}

export interface ConnectPeerArgsType {
	initiator: boolean;
	stream?: MediaStream;
	testerId?: string;
	offer?: SimplePeer.SignalData;
}
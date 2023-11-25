import { SignalData } from "simple-peer";
import { CameraDataType } from "./Cameras.type";
import { AnswerType, OfferConnectionEmitType, OfferConnectionListenType } from "./RTC.type";

export enum EVENTS {
	NEW_CONNECTION = "NEW_CONNECTION",
	OFFER_CONNECTION = "OFFER_CONNECTION",
	ANSWER_CONNECTION = "ANSWER_CONNECTION",
	GET_CAMERAS_REQ = "GET_CAMERAS_REQ",
	GET_CAMERAS_RES = "GET_CAMERAS_RES",
	ERROR_HAPPENED = "ERROR_HAPPENED",
}

export interface ListenEvents {
	OFFER_CONNECTION: (data: OfferConnectionListenType) => void;
	GET_CAMERAS_RES: (cameras: string[]) => void;
	ANSWER_CONNECTION: (signal: SignalData) => void;
	ERROR_HAPPENED: (message: string) => void;
}


export interface EmitEvents {
	OFFER_CONNECTION: (data: OfferConnectionEmitType) => void;
	ANSWER_CONNECTION: (data: AnswerType) => void;
	NEW_CONNECTION: (data: CameraDataType) => void;
	GET_CAMERAS_REQ: () => void;
}
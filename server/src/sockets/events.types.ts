import { SignalData } from "simple-peer";
import { CameraDataTesterType, CamerasDataType } from "../types/camera.types";

export enum EVENTS {
	NEW_CONNECTION = 'NEW_CONNECTION',
	OFFER_CONNECTION = 'OFFER_CONNECTION',
	ANSWER_CONNECTION = "ANSWER_CONNECTION",
	GET_CAMERAS_REQ = "GET_CAMERAS_REQ",
	GET_CAMERAS_RES = "GET_CAMERAS_RES",
}

export interface ListenEvents {
	OFFER_CONNECTION: (data: OfferConnectionType) => void;
	ANSWER_CONNECTION: (signal: SignalData) => void;
	NEW_CONNECTION: (data: CamerasDataType) => void;
	GET_CAMERAS_REQ: () => void;
}

interface OfferConnectionType {
	name: string;
	testerId: string;
	signal: SignalData;
}

export interface EmitEvents {
	OFFER_CONNECTION: (data: OfferConnectionType) => void;
	ANSWER_CONNECTION: (data: OfferConnectionType) => void;
	GET_CAMERAS_RES: (cameras: CameraDataTesterType[]) => void;
}
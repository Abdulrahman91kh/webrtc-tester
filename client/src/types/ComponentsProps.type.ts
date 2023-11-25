import { SelectChangeEvent } from "@mui/material";
import React, { ChangeEvent } from "react";
import { SelectedCandidatesType, WebRTCStatus } from "./Tester.type";

export interface WrapperPropsType {
	title: string;
	children: React.ReactNode
}

export interface CameraSelectorPropsType {
	selectedCamera: string;
	changeSelectedCamera: (cameraChangeEvent: SelectChangeEvent) => void;
	cameras: string[];
}

export interface ResultsPropsType {
	route: string;
	selectedCandidates: SelectedCandidatesType | undefined
}

export interface ErrorModalPropsType {
	handleClose: () => void;
	open: boolean;
	message: string;
}

export interface VideoPlayerProps {
	stream: MediaStream;
	muted: boolean;
}


export interface SectionTitlePropsType {
	title: string;
}

export interface AnalysisPropsType {
	status: WebRTCStatus;
	candidates: RTCIceCandidate[];
}

export interface ButtonPropsType {
	title: string;
	onClick: () => void;
}

export interface ControlsSectionPropsType {
	cameraOptions: string[];
	selectedCamera: string;
	changeSelectedCamera: (event: SelectChangeEvent) => void;
	connectToCamera: () => void;
	camPassword: string;
	setCamPassword: (password: string) => void;
}

export interface PreviewProps {
	stream?: MediaStream | null
}
export interface InputTextProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
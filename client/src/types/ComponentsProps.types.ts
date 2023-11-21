import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { WebRTCStatus } from "./Tester.type";

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
}

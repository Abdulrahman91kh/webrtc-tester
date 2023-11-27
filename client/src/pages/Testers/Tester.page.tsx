import { useEffect, useState } from "react";
import Wrapper from "../../containers/Wrapper/Wrapper";
import ControlsSection from "./components/Controls/Controls";
import Preview from "./components/Preview/Preview";
import Results from "./components/Results/Results";
import Styles from "./Tester.module.css";
import { SelectChangeEvent } from "@mui/material";
import Analysis from "./components/Analysis/Analysis";
import socket from "../../config/Sockets/Sockets";
import { EVENTS } from "../../types/Sockets.type";
import usePeerConnection from "../../hooks/usePeerConnection";
import SimplePeer from "simple-peer";
import { WebRTCStatus } from "../../types/Tester.type";

const TestersPage = () => {

	const [selectedCamera, setSelectedCamera] = useState<string>("");
	const [cameraOptions, setCameraOptions] = useState<string[]>([]);
	const [camPassword, setCamPassword] = useState<string>("");

	const {
		connectPeer,
		remoteStream,
		candidates,
		applySignal,
		status,
		resultRoute,
		selectedCandidates
	} = usePeerConnection(selectedCamera);

	const connectToCamera = () => {
		if(selectedCamera === "") return alert("Please select a camera to connect to...");
		connectPeer({initiator: true, password: camPassword});
	};

	useEffect(() => {
		
		const getCameraOptions = (cameras: string[]) => setCameraOptions(cameras);
		socket.emit(EVENTS.GET_CAMERAS_REQ);
		if(socket.listeners(EVENTS.GET_CAMERAS_RES).length){
			socket.removeAllListeners(EVENTS.GET_CAMERAS_RES);
		}
		socket.on(EVENTS.GET_CAMERAS_RES, getCameraOptions);

		const applyAnswer = (signal: SimplePeer.SignalData) => applySignal(signal);
		if(socket.listeners(EVENTS.ANSWER_CONNECTION).length){
			socket.removeAllListeners(EVENTS.ANSWER_CONNECTION);
		}
		socket.on(EVENTS.ANSWER_CONNECTION, applyAnswer);
	}, []);


	const handleChangeSelectedCamera = (event: SelectChangeEvent) => {
		setSelectedCamera(event.target.value);
	};

	

	return (
		<Wrapper
			title="Tester Page"
		>
			<div className={Styles.mainContent}>
				<div className={Styles.leftSide}>
					<ControlsSection
						cameraOptions={cameraOptions}
						selectedCamera={selectedCamera}
						changeSelectedCamera={handleChangeSelectedCamera}
						connectToCamera={connectToCamera}
						camPassword={camPassword}
						setCamPassword={setCamPassword}
					/>
				</div>
				<div className={Styles.rightSide}>
					<Preview 
						stream={remoteStream}
					/>
				</div>
			</div>
			<Results
				route={resultRoute}
				selectedCandidates={selectedCandidates}
			/>
			<Analysis 
				status={status as WebRTCStatus}
				candidates={candidates}
			/>
		</Wrapper>
	);
};

export default TestersPage;
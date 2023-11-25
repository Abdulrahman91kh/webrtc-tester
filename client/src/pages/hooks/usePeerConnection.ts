import { useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { Routes, SelectedCandidatesType, WebRTCStatus } from "../../types/Tester.type";
import { AnswerType, CandidateGathering, ConnectPeerArgsType, OfferConnectionEmitType, SimplePeerTypePC } from "../../types/RTC.type";
import { StunServers, TurnServers } from "./IceServers";
import { getGatheringState, getSelectedRoute } from "../Testers/Helpers/helper";
import socket from "../../config/Sockets/Sockets";
import { EVENTS } from "../../types/Sockets.type";



const usePeerConnection = ( selectedCamera?: string ) => {
	
	const peer = useRef<SimplePeerTypePC>();
	const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
	const [candidates, setCandidates] = useState<RTCIceCandidate[]>([]);
	const [status, setStatus] = useState<WebRTCStatus | CandidateGathering>(WebRTCStatus.NOT_CONNECTED);
	const [resultRoute, setResultRoute] = useState<Routes>(Routes.NA);
	const [selectedCandidates, setSelectedCandidates] = useState<SelectedCandidatesType>();

	const handleNewCandidate = ((event: RTCPeerConnectionIceEvent) => {
		if(!event.candidate) return;
		const { candidate } = event;
		setCandidates(prevCandidates => [...prevCandidates, candidate]);
	});

	const handleGatheringStateChange = (  async(event: Event) => {
		const p = (event.target as RTCPeerConnection);
		const gatheringState = getGatheringState(p?.iceGatheringState || "new");
		setStatus(gatheringState);
	});

	const handlingGeneratingOffer = (signal: SimplePeer.SignalData, password: string) => {
		const offerData: OfferConnectionEmitType = {
			name: selectedCamera as string,
			signal,
			password
		};
		socket.emit(EVENTS.OFFER_CONNECTION, offerData);
		setStatus(WebRTCStatus.OFFER_SENT);
	};

	const handleGeneratingAnswer = (signal: SimplePeer.SignalData, testerId: string) => {
		const answerData: AnswerType = {
			signal,
			testerId
		};
		socket.emit(EVENTS.ANSWER_CONNECTION, answerData);
	};

	const applySignal = (signal: SimplePeer.SignalData) => {
		peer.current?.signal(signal);
		setStatus(WebRTCStatus.ANSWER_SENT);
	};


	const handleGettingStream = async (stream: MediaStream) => {
		setRemoteStream(stream);
		const p = peer.current?._pc as RTCPeerConnection;
		const gatheringState = getGatheringState(p?.iceGatheringState || "new");
		if(gatheringState === CandidateGathering.COMPLETED) {
			const finalRoutes = await getSelectedRoute(p);
			setResultRoute(finalRoutes.finalRoute);
			setSelectedCandidates(finalRoutes.selectedCandidates);
		}

		setStatus(WebRTCStatus.CONNECTED);
	};

	const handleConnectionError = (err: Error) => {
		setRemoteStream(null);
		setCandidates([]);
		setStatus(WebRTCStatus.CONNECTION_FAILED);
		console.error(err);
		alert("Something went wrong with the connection, try again");
	};

	const connectPeer = ({initiator, stream, testerId, offer, password }: ConnectPeerArgsType) => {
		setRemoteStream(null);
		setCandidates([]);
		if(!initiator && !testerId) {
			alert("Should throw an error over sockets");
			return;
		}
		else if(initiator && (password === "" || !password)) {
			alert("Please provide the camera password to continue");
			return;
		}
		const options: SimplePeer.Options = {
			initiator,
			trickle: false,
			config: {
				iceServers: [
					...StunServers,
					...TurnServers
				]
			}
		};
		if(!initiator) {
			options["stream"] = stream;
		}
		setStatus(WebRTCStatus.CONNECTING);
		const p = new SimplePeer(options) as SimplePeerTypePC;
		if(initiator) {
			p._pc.addEventListener("icecandidate", handleNewCandidate);
			p._pc.addEventListener("icegatheringstatechange", handleGatheringStateChange);
			p.on("stream", handleGettingStream);
			p.on("signal", (signal: SimplePeer.SignalData) => handlingGeneratingOffer(signal, password as string));
		}
		else {
			p.signal(offer as SimplePeer.SignalData);
			p.on("signal", (signal) => handleGeneratingAnswer(signal, testerId as string));
		}
		p.on("close", (event: string) => console.log("[Closing]", event));
		p.on("error", handleConnectionError);
		p.on("end", (data: string) => console.log("[end]", data));

		peer.current = p;
	};

	return {
		peer,
		connectPeer,
		candidates,
		status,
		remoteStream,
		applySignal,
		resultRoute,
		selectedCandidates
	};
};

export default usePeerConnection;
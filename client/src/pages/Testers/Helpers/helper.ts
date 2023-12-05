import { CandidateGathering } from "../../../types/RTC.type";
import { FinalRouteType, Routes, SelectedCandidatesType } from "../../../types/Tester.type";

export const getCandidateType = (candidate: string): Routes => {
	if(candidate.includes("typ host")) 
		return Routes.Local;
	if( ["typ srflx", "typ prflx", "stun"].some(condition => candidate.includes(condition)) )
		return Routes.STUN;
	if(candidate.includes("typ relay") || candidate.includes("turn"))
		return Routes.TURN;
	return Routes.UNKNOWN;
};

export const getGatheringState = (iceGatheringState: RTCIceGatheringState) => {
	switch(iceGatheringState) {
		case "gathering":
			return CandidateGathering.STARTED;
		case "complete":
			return CandidateGathering.COMPLETED;
		default:
			return CandidateGathering.NOT_STARTED;
	}
};

const getFinalRoute =(senders: RTCRtpSender[]) => {
	return new Promise<FinalRouteType>((resolve) => {
		let selectedCandidates: SelectedCandidatesType | undefined;
		let finalRoute: Routes = Routes.UNKNOWN;
		senders.forEach(s => {
			if(!s.transport) return;
			const candidateTransport = s.transport.iceTransport;
			const selectedPair = (candidateTransport as any).getSelectedCandidatePair(); // For somereasone typescript is complaining about this function is not found for RTCIceTransport but it is there so here is a work around
			finalRoute = getCandidateType(selectedPair?.local?.candidate as string);
			selectedCandidates = {
				local: {
					candidate: selectedPair?.local?.candidate as string,
					route: getCandidateType(selectedPair?.local?.candidate as string)
				},
				remote: {
					candidate: selectedPair?.remote?.candidate as string,
					route: getCandidateType(selectedPair?.remote?.candidate as string)
				}
			};
			resolve({
				finalRoute, selectedCandidates
			});
		});
	});
};

export const getSelectedRoute = (p: RTCPeerConnection) => {
	const senders = p.getSenders();
	if(!senders.length) {
		return {
			finalRoute: Routes.UNKNOWN,
			selectedCandidates: {
				local: {
					candidate: "",
					route: Routes.UNKNOWN
				},
				remote: {
					candidate: "",
					route: Routes.UNKNOWN
				}}
		};
	}
	return getFinalRoute(senders);
	
};

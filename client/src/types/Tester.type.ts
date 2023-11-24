export enum WebRTCStatus {
	NOT_CONNECTED = "Not Connected",
	CONNECTING = "Connecting...",
	GATHERING_CANDIDATES = "Gathering Candidates",
	GATHERING_COMPLETED = "Gathering Candidates Completed",
	OFFER_SENT = "Candidates gathered, Offer Sent",
	ANSWER_SENT = "Candidates gathered, Answer Sent",
	CONNECTION_FAILED = "Connection Failed",
	CONNECTED = "Connected"
}

export enum Routes {
	NA = "NA",
	Local = "Local",
	STUN = "STUN",
	TURN = "TURN",
	UNKNOWN = "None of the above work",
}
interface SelectedCandidate {
	candidate: string;
	route: Routes
}
export interface SelectedCandidatesType {
	local: SelectedCandidate;
	remote: SelectedCandidate;
}
export interface FinalRouteType {
	finalRoute: Routes;
	selectedCandidates: SelectedCandidatesType;
}
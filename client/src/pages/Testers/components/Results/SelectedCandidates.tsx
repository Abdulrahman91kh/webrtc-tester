import { SelectedCandidatesType } from "../../../../types/Tester.type";

interface SelectedCandidatesPropsType {
	candidates: SelectedCandidatesType | undefined;
}
const SelectedCandidates = ({candidates}: SelectedCandidatesPropsType) => {
	if(!candidates) return null;
	return (
		<>
			<h5>Selected Candidates Locally</h5>
			<p>{candidates.local.candidate}</p>
			<h5>Selected Candidates Remotely</h5>
			<p>{candidates.remote.candidate}</p>
		</>
	);
};

export default SelectedCandidates;
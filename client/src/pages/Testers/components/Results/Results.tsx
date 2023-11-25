import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";
import { ResultsPropsType } from "../../../../types/ComponentsProps.type";
import { Routes } from "../../../../types/Tester.type";
import Styles from "./Results.module.css";
import SelectedCandidates from "./SelectedCandidates";

const Results = ({route, selectedCandidates}: ResultsPropsType) => {
	const routeStyle = route === Routes.NA ? Styles.routeNone : Styles.route;

	return (
		<>
			<SectionTitle title="Results" />
			<Card>
				<div>Selected route is: <span className={routeStyle}>{route}</span></div>
				<hr />
				<SelectedCandidates candidates={selectedCandidates} />
			</Card>
		</>
	);
};
export default Results;
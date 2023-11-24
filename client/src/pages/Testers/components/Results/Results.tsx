import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";
import { ResultsPropsType } from "../../../../types/ComponentsProps.type";
import { Routes } from "../../../../types/Tester.type";
import Styles from "./Results.module.css";

const Results = ({route}: ResultsPropsType) => {
	const routeStyle = route === Routes.NA ? Styles.routeNone : Styles.route;
	return (
		<>
			<SectionTitle title="Results" />
			<Card>
				Selected route is: <span className={routeStyle}>{route}</span>
			</Card>
		</>
	);
};
export default Results;
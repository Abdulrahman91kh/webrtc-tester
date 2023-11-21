import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";
import { ResultsPropsType } from "../../../../types/ComponentsProps.types";
import Styles from './Results.module.css';

const Results = ({route}: ResultsPropsType) => {
	return (
		<>
			<SectionTitle title="Results" />
			<Card>
				Selected route is: <span className={Styles.route}>{route}</span>
			</Card>
		</>
	)
};
export default Results;
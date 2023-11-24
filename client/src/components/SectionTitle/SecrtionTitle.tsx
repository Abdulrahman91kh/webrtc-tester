import Styles from "./SectionTitle.module.css";
import { SectionTitlePropsType } from "../../types/ComponentsProps.type";

const SectionTitle = ({title}: SectionTitlePropsType) => {
	return (
		<div className={Styles.title}>{title}</div>
	);
};

export default SectionTitle;
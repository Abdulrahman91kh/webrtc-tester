import { ButtonPropsType } from "../../types/ComponentsProps.types";
import Styles from "./Button.module.css";

const Button = ({title}: ButtonPropsType) => {
	
	return (
		<div className={Styles.button}>{title}</div>
	);
};

export default Button;
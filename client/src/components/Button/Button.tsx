import { ButtonPropsType } from "../../types/ComponentsProps.types";
import Styles from "./Button.module.css";

const Button = ({title, onClick}: ButtonPropsType) => {
	
	return (
		<button className={Styles.button} onClick={onClick}>{title}</button>
	);
};

export default Button;
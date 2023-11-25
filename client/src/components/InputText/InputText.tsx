import { FormControl, InputBase, InputLabel } from "@mui/material";
import { InputTextProps } from "../../types/ComponentsProps.type";
import Styles from "./InputText.module.css";

const InputText = ({value, onChange}: InputTextProps) => {
	return (
		<div className={Styles.inputContainer}>
			<FormControl fullWidth>
				<InputLabel id="camera-password">Camera Selector</InputLabel>
				<InputBase
					id="camera-password"
					value={value}
					onChange={onChange}
				/>
			</FormControl>
		</div>
	);
};

export default InputText;
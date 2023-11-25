import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "../../../components/Button/Button";
import { ErrorModalPropsType } from "../../../types/ComponentsProps.type";

const ErrorModal = ({
	open,
	handleClose,
	message
}: ErrorModalPropsType) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>
				Error Happened
			</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button title="Close" onClick={handleClose} />
			</DialogActions>
		</Dialog>
	);
};

export default ErrorModal;
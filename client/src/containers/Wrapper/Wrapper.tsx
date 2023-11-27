import { useEffect, useState } from "react";
import Divider from "../../components/Divider/Divider";
import { WrapperPropsType } from "../../types/ComponentsProps.type";
import Styles from "./Wrapper.module.css";
import socket from "../../config/Sockets/Sockets";
import { EVENTS } from "../../types/Sockets.type";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const Wrapper = ({title, children}: WrapperPropsType) => {

	const [errorMessages, setErrorMessages] = useState<string>("");
	const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

	useEffect(() => {
		const handleError = (message: string) => {
			setShowErrorModal(true);
			setErrorMessages(message);
		};
		socket.on(EVENTS.ERROR_HAPPENED, handleError);
	}, []);

	const closeModal = () => setShowErrorModal(false);

	return (
		<div>
			<header className={Styles.header}>
				<h1 className={Styles.title}>{title}</h1>
			</header>
			<Divider />
			<section className="main-content">
				{children}
			</section>
			<ErrorModal 
				open={showErrorModal}
				handleClose={closeModal}
				message={errorMessages}
			/>
		</div>
	);
};

export default Wrapper;
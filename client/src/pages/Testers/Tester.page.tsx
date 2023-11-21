import { useState } from "react";
import Wrapper from "../../containers/Wrapper/Wrapper";
import ControlsSection from "./components/Controls/Controls";
import Preview from "./components/Preview/Preview";
import Results from "./components/Results/Results";
import Styles from './Tester.module.css';
import { SelectChangeEvent } from "@mui/material";
import Analysis from "./components/Analysis/Analysis";
import { WebRTCStatus } from "../../types/Tester.type";

const TestersPage = () => {

	const [selectedCamera, setSelectedCamera] = useState<string>('');
	const [resultRoute, setResultRoute] = useState<string>('NA');
	const [status, setStatus] = useState<WebRTCStatus>(WebRTCStatus.NOT_CONNECTED)


	const handleChangeSelectedCamera = (event: SelectChangeEvent) => {
		setSelectedCamera(event.target.value);
	};

	return (
		<Wrapper
			title="Tester Page"
		>
			<div className={Styles.mainContent}>
				<div className={Styles.leftSide}>
					<ControlsSection
						selectedCamera={selectedCamera}
						changeSelectedCamera={handleChangeSelectedCamera}
					/>
					<Results route={resultRoute} />
				</div>
				<div className={Styles.rightSide}>
					<Preview />
				</div>
			</div>
			<Analysis 
				status={status}
			/>
		</Wrapper>
	)
};

export default TestersPage;
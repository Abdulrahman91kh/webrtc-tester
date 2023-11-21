import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";

const cameras = ['camera1', 'camera2', 'camera3']

const ControlsSection = ({selectedCamera, changeSelectedCamera}) => {
	return (
		<>
			<SectionTitle title="Settings" />
			<section className="controls">
				<Card>
					<FormControl fullWidth>
						<InputLabel id="camera-selector">Camera Selector</InputLabel>
						<Select
							labelId="camera-selector-label"
							id="camera-selector"
							value={selectedCamera}
							label="Camera Selector"
							onChange={changeSelectedCamera}
						>
							{cameras.map(c => (
								<MenuItem value={c}>{c}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Card>
			</section>
		</>
	);
};

export default ControlsSection;
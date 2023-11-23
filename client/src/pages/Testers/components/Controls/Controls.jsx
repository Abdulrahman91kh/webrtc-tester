import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";

const cameras = ["camera1", "camera2", "camera3"];

const ControlsSection = ({
	selectedCamera,
	changeSelectedCamera,
	addRemoteStream,
	setAddRemoteStream
}) => {
	const handleChange = (event) => {
		setAddRemoteStream(!addRemoteStream);
	};
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
							{cameras.map((c, i) => (
								<MenuItem key={`${c}-${i}`} value={c}>{c}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControlLabel 
						control={
							<Checkbox checked={addRemoteStream} onChange={handleChange} />
						}
						label="Label"
					/>
				</Card>
			</section>
		</>
	);
};

export default ControlsSection;
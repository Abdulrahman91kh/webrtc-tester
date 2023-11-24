import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";
import Button from "../../../../components/Button/Button";
import { ControlsSectionPropsType } from "../../../../types/ComponentsProps.type";


const ControlsSection = ({
	cameraOptions,
	selectedCamera,
	changeSelectedCamera,
	connectToCamera
}: ControlsSectionPropsType) => {
	console.log(cameraOptions);
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
							{cameraOptions.map((c, i) => (
								<MenuItem key={`${c}-${i}`} value={c}>{c}</MenuItem>
							))}
						</Select>
					</FormControl>
					
					<Button 
						title="Connect"
						onClick={connectToCamera}
					/>
				</Card>
			</section>
		</>
	);
};

export default ControlsSection;
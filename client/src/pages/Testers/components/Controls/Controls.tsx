import { FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";
import Button from "../../../../components/Button/Button";
import { ControlsSectionPropsType } from "../../../../types/ComponentsProps.type";
import { ChangeEvent } from "react";
import InputText from "../../../../components/InputText/InputText";


const ControlsSection = ({
	cameraOptions,
	selectedCamera,
	changeSelectedCamera,
	connectToCamera,
	camPassword,
	setCamPassword
}: ControlsSectionPropsType) => {
	

	const handleChangePassword = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCamPassword(event.target.value);
	};
	const handleFillMe = () => {
		const password = selectedCamera.split("Camera-")[1];
		setCamPassword(password);
	};

	return (
		<>
			<SectionTitle title="Settings" />
			<section className="controls">
				<Card>
					<FormControl fullWidth sx={{marginBottom: "15px"}}>
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
					
					<InputText
						value={camPassword}
						onChange={handleChangePassword}
					/>
					{/* Here */}

					<Tooltip title="Only For Debugging">
						<span>
							<Button 
								title="Fill Me"
								onClick={handleFillMe}
							/>
						</span>
					</Tooltip>
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
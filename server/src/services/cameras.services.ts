import { getAllCameras as getAllCam, registerCamera as registerCam, deleteCamera as deleteCam } from "../storage/cameras";
import { CameraDataTesterType, CamerasIncomingDataType } from "../types/camera.types";

export const registerNewCamera = (id: string, data: CamerasIncomingDataType) => {
	return registerCam(id, JSON.stringify({...data, socketId: id}));
};

export const getCameraByNamePassword = async (name: string, password: string) => {
	const camString = await getAllCam();
	const cameras = Object.values(camString).map(c => {
		const data = JSON.parse(c);
		return data;
	});
	const camera = cameras.find(c => c.name === name);
	if(password !== camera.password) {
		throw new Error("Camera Authentication Error!");
	}
	delete camera.password;
	return camera as CameraDataTesterType;
} 

export const getAllCamerasNames = async () => {
	const cameras = await getAllCam();
	const camerasValues = Object.values(cameras).map(c => {
		const data = JSON.parse(c);
		return data.name;
	});
	return camerasValues as CameraDataTesterType[];
}

export const deleteCamera = (socketId: string) => {
	return deleteCam(socketId);
};
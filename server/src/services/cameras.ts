import { getAllCameras as getAllCam, registerCamera as registerCam, deleteCamera as deleteCam } from "../storage/cameras";
import { CamerasIncomingDataType } from "../types/camera.types";

export const registerNewCamera = (id: string, data: CamerasIncomingDataType) => {
	return registerCam(id, JSON.stringify({...data, socketId: id}));
};

export const getAllCameras = async () => {
	const cameras = await getAllCam();
	const camerasValues = Object.values(cameras).map(c => {
		const data = JSON.parse(c);
		delete data.password;
		return data;
	});
	return camerasValues;
};

export const getAllCamerasNames = async () => {
	const cameras = await getAllCam();
	const camerasValues = Object.values(cameras).map(c => {
		const data = JSON.parse(c);
		return data.name;
	});
	return camerasValues;
}

export const deleteCamera = async (socketId: string) => {
	return deleteCam(socketId);
};

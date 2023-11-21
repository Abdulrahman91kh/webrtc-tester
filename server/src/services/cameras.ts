import { getAllCameras as getAllCam, registerCamera as registerCam, deleteCamera as deleteCam } from "../storage/cameras";

export const registerNewCamera = (id: string, data) => {
	return registerCam(id, JSON.stringify({...data, socketId: id}));
}

export const getAllCameras = async () => {
	const cameras = await getAllCam();
	console.log('allcameras++', Object.keys(cameras))
	const camerasValues = Object.values(cameras).map(c => {
		const data = JSON.parse(c);
		delete data.password;
		return data;
	});
	return camerasValues;
}

export const deleteCamera = async (socketId: string) => {
	return deleteCam(socketId);
}
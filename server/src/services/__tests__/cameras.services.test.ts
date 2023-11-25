import * as CamerasModel from '../../storage/cameras';
import { deleteCamera, getAllCamerasNames, getCameraByNamePassword, registerNewCamera } from '../cameras.services';

beforeEach(() => {
	jest.clearAllMocks();
});

describe("Testing Camera Services", () => {
	
	it("Should call for regiterCam function with the proper inputs", async () => {
		jest.spyOn(CamerasModel, "registerCamera").mockReturnValueOnce("" as any);
		const id = "some-id";
		const data = {data: "my-data"};
		await registerNewCamera(id, data as any);
		expect(CamerasModel.registerCamera).toHaveBeenCalledWith("some-id", JSON.stringify({
			data: "my-data",
			socketId: "some-id"
		}));
	});

	it("Testing getCameraByNamePassword calling getAllCam and pass", async () => {
		const mockCameras = {
			"socketId": JSON.stringify({name: "camera-name", socketId: "socketId", password: "password"})
		};
		const mockName = "camera-name";
		const mockPassword = "password"
		jest.spyOn(CamerasModel, "getAllCameras").mockResolvedValueOnce(mockCameras);
		const cameras = await getCameraByNamePassword(mockName, mockPassword);
		expect(CamerasModel.getAllCameras).toHaveBeenCalled();
		expect(cameras).toEqual(expect.objectContaining({name: "camera-name", socketId: "socketId"}));
	});


	it("Testing getCameraByNamePassword calling getAllCam it shouldn't pass because of different password", async () => {
		const mockCameras = {
			"socketId": JSON.stringify({name: "camera-name", socketId: "socketId", password: "password"})
		};
		const mockName = "camera-name";
		const mockPassword = "different password"
		jest.spyOn(CamerasModel, "getAllCameras").mockResolvedValueOnce(mockCameras);
		await expect(getCameraByNamePassword(mockName, mockPassword)).rejects.toThrow("Camera Authentication Error!");
		expect(CamerasModel.getAllCameras).toHaveBeenCalled();
	});

	it("Testing getAllCamerasNames calling getAllCam and mapping it to names", async () => {
		const mockCameras = {
			"socketId": JSON.stringify({name: "camera-name", socketId: "socketId", password: "password"})
		};
		jest.spyOn(CamerasModel, "getAllCameras").mockResolvedValueOnce(mockCameras);
		const cameras = await getAllCamerasNames();
		expect(CamerasModel.getAllCameras).toHaveBeenCalled();
		expect(cameras).toEqual(expect.arrayContaining(["camera-name"]));

	});

	it("Testing deleteCamera calling deleteCam", async () => {
		const mockSocketId = "socket-id";
		jest.spyOn(CamerasModel, "deleteCamera").mockReturnValueOnce("" as any);
		await deleteCamera(mockSocketId);
		expect(CamerasModel.deleteCamera).toHaveBeenCalledWith(mockSocketId);
	});

});
import {v4 as uuid} from "uuid";

export const getCameraCredentials = () => {
	const uniqueValue = uuid();
	return {
		name: `Camera-${uniqueValue}`,
		password: uniqueValue
	};
};
import { useEffect, useState } from "react";

const useGetLocalStream = () => {
	const [localStream, setLocalStream] = useState<MediaStream>();

	useEffect(() => {
		( async () => {
			const constraints = {
				video: true,
				audio: true
			};
			try {
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				setLocalStream(stream);
			}
			catch(err) {
				console.error(err);
			}
			
		}
		)();
	}, []);

	return {
		localStream
	};
};

export default useGetLocalStream;
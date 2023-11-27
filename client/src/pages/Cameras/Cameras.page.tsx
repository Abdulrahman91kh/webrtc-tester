import Wrapper from "../../containers/Wrapper/Wrapper";
import Styles from "./Cameras.module.css";
import useGetLocalStream from "../../hooks/useGetLocalStream";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { useEffect } from "react";
import { getCameraCredentials } from "./Helpers/helpers";
import socket from "../../config/Sockets/Sockets";
import { EVENTS } from "../../types/Sockets.type";
import usePeerConnection from "../../hooks/usePeerConnection";

const CamerasPage = () => {
	const { localStream } = useGetLocalStream();
	const { connectPeer } = usePeerConnection();

	useEffect(() => {
	
		const camera = getCameraCredentials();
		socket.emit(EVENTS.NEW_CONNECTION, camera);

	}, []);

	useEffect(() => {
		if(socket.listeners(EVENTS.OFFER_CONNECTION).length){
			socket.removeAllListeners(EVENTS.OFFER_CONNECTION);
		}
		socket.on(EVENTS.OFFER_CONNECTION, ({signal, testerId}) => {
			connectPeer({
				initiator: false,
				testerId,
				stream: localStream,
				offer: signal
			});
		});
	}, [localStream]);

	return (
		<Wrapper
			title="Cameras Debugging Page"
		>
			<div className={Styles.container}>
				{localStream && <VideoPlayer
					muted={true}
					stream={localStream}
				/>
				}
			</div>
		</Wrapper>
	);
};

export default CamerasPage;
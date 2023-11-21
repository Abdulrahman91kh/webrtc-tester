import Wrapper from "../../containers/Wrapper/Wrapper";
import Styles from "./Cameras.module.css";
import useGetLocalStream from "./hooks/useGetLocalStream";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";

const CamerasPage = () => {
	const { localStream } = useGetLocalStream();

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
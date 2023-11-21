import VideoPlayer from "../../../../components/VideoPlayer/VideoPlayer";

const Preview = () => {
	return (
		<VideoPlayer
			stream={new MediaStream()}
			muted={true}
		/>
	)
};

export default Preview;
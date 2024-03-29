import { useEffect, useRef } from "react";
import { VideoPlayerProps } from "../../types/ComponentsProps.type";
import Styles from "./VideoPlayer.module.css";

const VideoPlayer = ({stream, muted}: VideoPlayerProps) => {

	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if(videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<video
			className={Styles.video}
			ref={videoRef}
			muted={muted}
			playsInline
			autoPlay
		/>
	);
};

export default VideoPlayer;
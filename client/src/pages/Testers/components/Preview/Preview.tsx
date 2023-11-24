import Card from "../../../../components/Card/Card";
import VideoPlayer from "../../../../components/VideoPlayer/VideoPlayer";
import { PreviewProps } from "../../../../types/ComponentsProps.type";

const Preview = ({stream}: PreviewProps) => {
	if(!stream){
		return (
			<Card> No Feed to preview</Card>
		);
	}
	return (
		<VideoPlayer
			stream={stream}
			muted={true}
		/>
	);
};

export default Preview;
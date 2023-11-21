import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Wrapper from "../../containers/Wrapper/Wrapper";

const NotFound404 = () => {
	return (
		<Wrapper
			title="404 Page Not Found"
		>
			<Card>
				<div className="alignCenter">
					Sorry, this path is not found.
					<Button title="Back Home" />
				</div>
			</Card>
		</Wrapper>
	);
};

export default NotFound404;
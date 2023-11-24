import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Wrapper from "../../containers/Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
	
	const navigate = useNavigate();
	const navigateToHome = () => navigate("/");

	return (
		<Wrapper
			title="404 Page Not Found"
		>
			<Card>
				<div className="alignCenter">
					Sorry, this path is not found.
					<Button title="Back Home" onClick={navigateToHome}/>
				</div>
			</Card>
		</Wrapper>
	);
};

export default NotFound404;
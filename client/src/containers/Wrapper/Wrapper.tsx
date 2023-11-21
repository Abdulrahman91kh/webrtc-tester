import Divider from "../../components/Divider/Divider";
import { WrapperPropsType } from "../../types/ComponentsProps.types";
import Styles from "./Wrapper.module.css";

const Wrapper = ({title, children}: WrapperPropsType) => {
	return (
		<div>
			<header className={Styles.header}>
				<h1 className={Styles.title}>{title}</h1>
			</header>
			<Divider />
			<section className="main-content">
				{children}
			</section>
		</div>
	);
};

export default Wrapper;
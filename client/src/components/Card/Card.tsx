import SectionTitle from '../SectionTitle/SecrtionTitle';
import Styles from './Card.module.css';

const Card: React.FC<{ children: React.ReactNode }> = ({children}) => {
	return (
		<div className={Styles.cardBackground}>
			{children}
		</div>
	)
}

export default Card;
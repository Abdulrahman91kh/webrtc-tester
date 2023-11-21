import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";

const Analysis = ({status}: any) => {
	return (
		<>
			<SectionTitle title="Analysis" />
			<Card>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={{color: 'white'}}>Status:</TableCell>
							<TableCell style={{fontWeight: 900}} align="center">{String(status)}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					</TableBody>
				</Table>
			</Card>
		</>
	);
};

export default Analysis;
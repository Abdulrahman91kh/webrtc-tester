import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SecrtionTitle";
import { AnalysisPropsType } from "../../../../types/ComponentsProps.type";
import { getCandidateType } from "../../Helpers/helper";

const Analysis = ({status, candidates}: AnalysisPropsType) => {
	const formattedCandidates = candidates.map((c, i) => (
		<TableRow key={`candidate-row-${i}`}>
			<TableCell>{c.protocol}</TableCell>
			<TableCell>{c.address}</TableCell>
			<TableCell>{c.port}</TableCell>
			<TableCell>{c.priority}</TableCell>
			<TableCell>{getCandidateType(c.candidate)}</TableCell>
		</TableRow>
	));
	return (
		<>
			<SectionTitle title="Analysis" />
			<Card>
				<div>Status: <strong>{status}</strong></div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={{color: "white"}} >Protocol</TableCell>
							<TableCell  style={{color: "white"}} >address</TableCell>
							<TableCell  style={{color: "white"}} >Port</TableCell>
							<TableCell  style={{color: "white"}} >Priority</TableCell>
							<TableCell  style={{color: "white"}} >Type</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ formattedCandidates }
					</TableBody>
				</Table>
			</Card>
		</>
	);
};

export default Analysis;
import { chakra } from "@chakra-ui/react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import theme from "../theme";
import  API  from "api/api";
import { GraphData } from "../../models/trendingword";


  
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
export const TrendChart = () => {

	/**
     * REPLACE DUMMY DATA WITH API DATA 
     * IMPLEMENT SOME MORE CONTEXT TO THE TIME PERIOD: maybe a select time period functionality
     */

	const [graphData, setGraphData] = useState<GraphData[]>();

	useEffect(() => {
		const word = localStorage.getItem("word");
 
		word && API.getInteresOvertimeForSearchTerm(word).then((stats) => {
			setGraphData(stats);
			console.log("YOLOSWAGGGGGG");
			console.log(graphData);
		}).catch(error => {
			console.error("Failed to fetch graph data: %o", error);
		});		
	},[]);

	const labels = ["January", "February", "March", "April", "May", "June", "July"];
	const counts = [3,1,6,7,8,4,6];

	const options = {
		responsive: true,    
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Number of searches over time",
			},
			
		},
	};
  
	const data = {
		labels,
		datasets: [
			{
				label: "Searches",
				data: counts,
				borderColor: theme.colors.chartgraphgreen,
				backgroundColor: theme.colors.lightchartgraphgreen,
			},

		],
	};

	const chartStyle = {
		padding: "25px",
	};

	return (
		<><chakra.h1
			textAlign={"center"}
			fontSize={"4xl"}
			py={10}
			fontWeight={"bold"}
			color={"forest"}
			padding={0}
			marginTop={5}>
            How is the word doing?
		</chakra.h1><Line options={options} data={data} style={chartStyle}/></>
	);
};

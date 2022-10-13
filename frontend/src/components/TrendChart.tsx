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
import { Line } from "react-chartjs-2";

  
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
				borderColor: "rgb(76,145,124)",
				backgroundColor: "rgba(76,145,124, 0.5)",
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

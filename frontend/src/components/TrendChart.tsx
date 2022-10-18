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
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import theme from "../theme";
import  API  from "api/api";
import { GraphData } from "../../models/trendingword";
import {nb} from "date-fns/locale";
import { SelectedWordContext } from "context/selectedWordContext";

  
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

	const [graphData, setGraphData] = useState<GraphData[]>();
	const {trendingWord} = useContext(SelectedWordContext);

	useEffect(() => {
 
		trendingWord && API.getInteresOvertimeForSearchTerm(trendingWord.word).then((stats) => {
			setGraphData(stats);
			console.log(stats);
		}).catch(error => {
			console.error("Failed to fetch graph data: %o", error);
		});		
	},[]);

	const labels: string[] = [];
	const counts: number[] = [];
	if(graphData){
		graphData.forEach(elem => labels.push((new Date(elem.date)).toLocaleDateString()));
		console.log("LABELS (dates): ");
		console.log(labels);
		
	}
	if(graphData){
		graphData.forEach(element=>counts.push(element.relative_search_value));
		console.log("COUNTS : ");
		console.log(counts);
	}

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
		scales: {
			x: {
				adapters: {
					date: {locale: nb},
					type: "time",
					distribution: "linear",
					time: { 
						parser: "yyyy-MM-dd", 
						unit: "month"
					},
					title: {
						display: true,
						text: "Date"
					}
				}
			}
		},
	};
  
	const data = {
		labels,
		datasets: [
			{
				label: "Relative popularity",
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
            Weekley relative popularity the last year
		</chakra.h1><Line options={options} data={data} style={chartStyle}/></>
	);
};

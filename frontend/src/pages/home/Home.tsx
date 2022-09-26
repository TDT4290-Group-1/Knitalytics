import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";

const HomePage = () => {

	const [trendingWords, setTrendingWords] = useState<TrendingWord[]>([]);

console.log(trendingWords)

	useEffect(() => {
		console.log("Jhjkj")
		API.getAllTrendingWords().then((trendingWords) => {
			setTrendingWords(trendingWords);
		});

	});


	return (
		<ContentBox
			category="Word"
			statName="Growth"
			items={[{ name: "JK", value: "JK", value2: "JKl" }, { name: "Irish wool", value: "10%", value2: "543 søk" }]}
		/>
	);
};

export default HomePage;

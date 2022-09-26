import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";

const HomePage = () => {

	const [trendingWords, setTrendingWords] = useState<TrendingWord>();


	useEffect(() => {
		console.log("Jhjkj");
		API.getAllTrendingWords().then((trendingWords) => {
			console.log("TRJKBJJKHB", trendingWords);
		
			setTrendingWords(trendingWords as TrendingWord,);
		});
		// setTrendingWords(API.getAllTrendingWords());

	},[]);
	console.log("qqq",trendingWords);

	return (
		<>
			{trendingWords && 
		<ContentBox
			category="Word"
			statName="Growth"
			items={[trendingWords]}
		/>}
		</>
	);
};

export default HomePage;

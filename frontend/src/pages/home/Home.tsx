import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";

const HomePage = () => {

	const [trendingWords, setTrendingWords] = useState<TrendingWord[]>();


	useEffect(() => {
		API.getAllTrendingWords().then((trendingWords) => {
		
			setTrendingWords(trendingWords as TrendingWord[],);
		});
		// setTrendingWords(API.getAllTrendingWords());

	},[]);


	return (
		<>
			{trendingWords && 
		<ContentBox
			category="Word"
			statName="Growth"
			items={trendingWords}
		/>}
		</>
	);
};

export default HomePage;

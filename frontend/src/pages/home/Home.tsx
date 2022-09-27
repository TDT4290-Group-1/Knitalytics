import { Heading, Center } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import SideBar from "components/SideBar";
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

	console.log(trendingWords);

	return (
		<>
			<SideBar/>
			<Center>
				<Heading>Trending Words</Heading>
			</Center>
			{trendingWords ?
				<ContentBox
					category="Word"
					statName="Growth"
					items={trendingWords}
				/> : <div>loading</div>}
		</>
	);
};

export default HomePage;

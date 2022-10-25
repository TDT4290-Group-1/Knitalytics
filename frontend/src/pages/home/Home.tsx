import { Center, chakra, VStack } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState } from "react";


const HomePage = () => {

	const [trendingWords, setTrendingWords] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not

	const [trendingWordsError, setTrendingWordsError] = useState(false);

	const [filter, setFilter] = useState(false);

	const [timeframe, setTimeframe] = useState("last_three_months");
	
	// check whether trending words have been retrieved
	if (typeof trendingWords === "undefined") {
		// fetch the words
		API.getAllTrendingWords("", filter, timeframe).then((trendingWords) => {
			setTrendingWords(trendingWords as TrendingWord[]);
		}).catch(() => {
			setTrendingWords([]); // set to something defined so we avoid infinite API calls
			setTrendingWordsError(true);
		});
	}


	return (
		<>
			<Center>
				<VStack>
					<chakra.h1
						textAlign={"center"}
						fontSize={"5xl"}
						paddingTop={5}
						fontWeight={"bold"}
						color={"forest"}>
					Trending Words 
					</chakra.h1>
					<chakra.h1
						textAlign={"center"}
						fontSize={"lg"}
						paddingBottom={20}
						fontWeight={"bold"}
						color={"forest"}>
					Google searches 
					</chakra.h1>
				</VStack>
			</Center>
			<ContentBox
				items={trendingWords}
				setTrendingWords={setTrendingWords}
				setFilter={setFilter}
				timeframe={timeframe}
				setTimeframe={setTimeframe}
			/>
		</>
	);
};

export default HomePage;

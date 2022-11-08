import { Center, chakra, VStack } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "services/apiService";
import {TrendingWord} from "../../models/trendingword";
import { useState } from "react";


const HomePage = () => {

	let initFilter: boolean = sessionStorage?.wordFilter === "true";
	let initTimeframe: string = sessionStorage?.wordTimeframe;

	// words to display
	const [trendingWords, setTrendingWords] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not

	// whether error occurred
	const [trendingWordsError, setTrendingWordsError] = useState<string | undefined>(undefined);

	// whether to remove commonly occurring 
	if (typeof initFilter === "undefined") {
		initFilter = false;
	}

	const [filter, setFilter] = useState<boolean>(initFilter);

	// if no timeframe found in session storage
	if (typeof initTimeframe === "undefined") {
		initTimeframe = "last_week";
	} 

	// timeframe to retrieve statistics for
	const [timeframe, setTimeframe] = useState<string>(initTimeframe);

	// check whether trending words have been retrieved
	if (typeof trendingWords === "undefined") {
		// fetch the words
		API.getTrendingWords("", filter, timeframe).then((trendingWords) => {
			setTrendingWords(trendingWords as TrendingWord[]);
		}).catch((error) => {
			setTrendingWords([]); // set to something defined so we avoid infinite API calls
			if (error.response) {
				console.log(`Error response: ${error.response.data}`);
				setTrendingWordsError(error.response.data);
			}
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
			{trendingWordsError ? 
				<chakra.h1
					textAlign={"center"}
					fontSize={"xl"}
					py={5}
					fontWeight={"bold"}
					color={"forest"}>
					{trendingWordsError}
				</chakra.h1>:
				<ContentBox
					items={trendingWords}
					setTrendingWords={setTrendingWords}
					filter={filter}
					setFilter={setFilter}
					timeframe={timeframe}
					setTimeframe={setTimeframe}
				/>
			}
			
		</>
	);
};

export default HomePage;

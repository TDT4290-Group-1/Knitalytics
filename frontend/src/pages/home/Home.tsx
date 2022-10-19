import { Center, chakra } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState } from "react";


const HomePage = () => {

	const [trendingWords, setTrendingWords] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not

	const [trendingWordsError, setTrendingWordsError] = useState(false);

	// check whether trending words have been retrieved
	if (typeof trendingWords === "undefined") {
		// fetch the words
		API.getAllTrendingWords().then((trendingWords) => {
			setTrendingWords(trendingWords as TrendingWord[]);
		}).catch(() => {
			setTrendingWords([]); // set to something defined so we avoid infinite API calls
			setTrendingWordsError(!trendingWordsError);
		});
	}

	return (
		<>
			<Center>
				<chakra.h1
					textAlign={"center"}
					fontSize={"5xl"}
					py={10}
					paddingBottom={20}
					fontWeight={"bold"}
					color={"forest"}>
					Trending Words 
				</chakra.h1>
			</Center>
				
			{trendingWords ? 
				<ContentBox
					items={trendingWords}
					tabletype="google" 
				/> : <div>loading</div>
			}
						

		</>
	);
};

export default HomePage;

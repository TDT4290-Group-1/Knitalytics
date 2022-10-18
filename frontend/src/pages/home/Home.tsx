import { Center, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState } from "react";
import theme from "../../theme";


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
				<Text fontSize={"6xl"} marginBottom={"6%"} color={theme.colors.forest}>Trending words</Text>
			</Center>
			<SimpleGrid minChildWidth='350px' spacingY='50px' spacingX="0px">
				<Box>
					<VStack >
						<Center>
							<Text marginBottom={"10%"} fontSize={"2xl"}  color={theme.colors.forest}>Google Trends</Text>
						</Center>
						{trendingWords ? 
							<ContentBox
								items={trendingWords}
								tabletype="google" 
							/> : <div>loading</div>
						}
						
					</VStack>
				</Box>

				<Box>
					<VStack>
						<Center>
							<Text marginBottom={"10%"} fontSize={"2xl"} color={theme.colors.forest}>Instagram Hashtags</Text>
						</Center>
						{/* {trendingHashtags ?
							<ContentBox
								items={trendingHashtags}
								tabletype={"instagram"}
							/> : <div>loading</div>} */}
					</VStack>

				</Box>
			</SimpleGrid>

		</>
	);
};

export default HomePage;

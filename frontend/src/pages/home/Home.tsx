import { Center, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";
import theme from "../../theme";


const HomePage = () => {

	/**
	 * TODO: implement seperate components for Google Trends and Instagram, with associated state
	 */

	const [trendingWords, setTrendingWords] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not

	const [trendingWordsError, setTrendingWordsError] = useState(false);

	const [trendingHashtags, setTrendingHashtags] = useState<TrendingWord[]>();


	

	// check whether words ranked according to frequnecy growth have been retrieved
	// TODO: move into separate Google Trends component
	if (typeof wordsFreqGrowth === "undefined") {
		// fetch the words
		API.getAllTrendingWords(TredningWordsFilter.FrequencyGrowth).then((trendingWords) => {
			setWordsFreqGrowth(trendingWords as TrendingWord[]);
		}).catch(() => {
			setWordsFreqGrowth([]);
			setWordsFreqGrowthError(!wordsFreqGrowthError);
		});
	}

	// check whether words ranked according to search count have been retrieved
	if (typeof wordsSearchCount === "undefined") {
		// fetch the words
		API.getAllTrendingWords(TredningWordsFilter.SearchCount).then((trendingWords) => {
			setWordsSearchCount(trendingWords);
		}).catch(() => {
			setWordsSearchCount([]);
			setWordsSearchCountError(!wordsSearchCountError);
		});
	}



	// This function needs to differantiate between fetching instagram data or google data.
	// Awaiting backend implementation
	useEffect(() => {
		//TODO: change hardcoded "knitting" to a dynamic query
		API.getAllRelatedHashtags("knitting").then((trendingHashtags) => {
			const hashtags = trendingHashtags;
			const hashtagsMap = hashtags.map((hashtag): TrendingWord => {
				return {
					word: hashtag,
					metric: -1 // default value
				};
			});
			setTrendingHashtags(hashtagsMap);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});
		// setTrendingWords(API.getAllTrendingWords());
	},[]);

	return (
		<>
			<Center>
				<Text fontSize={"6xl"} marginBottom={"6%"} color={theme.colors.forest}>Trending words</Text>
			</Center>
			<SimpleGrid minChildWidth='350px' spacingY='50px' spacingX="0px">
				<Box>
					{/**
					 * TODO: separate instagram and google ContentBox to separate components, and move state down
					 */}
					<VStack >
						<Center>
							<Text marginBottom={"10%"} fontSize={"2xl"}  color={theme.colors.forest}>Google Trends</Text>
						</Center> 
						<ContentBox
							displayMetric={displayMetric} 
							items={displayMetric === TredningWordsFilter.FrequencyGrowth ? wordsFreqGrowth : wordsSearchCount} 
							setDisplayMetric={setDisplayMetric}
						/>
					</VStack>
				</Box>

				<Box>
					<VStack>
						<Center>
							<Text marginBottom={"10%"} fontSize={"2xl"} color={theme.colors.forest}>Instagram Hashtags</Text>
						</Center>
						{trendingHashtags ?
							<ContentBox
								displayMetric="Growth"
								items={trendingHashtags}
								setDisplayMetric={setDisplayMetric}
							/> : <div>loading</div>}
					</VStack>

				</Box>
			</SimpleGrid>

		</>
	);
};

export default HomePage;

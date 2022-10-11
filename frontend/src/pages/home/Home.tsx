import { Center, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";
import theme from "../../theme";
import { TredningWordsFilter } from "utils/trendingWordsFilter";


const HomePage = () => {


	const [wordsFreqGrowth, setWordsFreqGrowth] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not
	const [wordsSearchCount, setWordsSearchCount] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not

	const [wordsFreqGrowthError, setWordsFreqGrowthError] = useState(false);
	const [wordsSearchCountError, setWordsSearchCountError] = useState(false);


	const [trendingHashtags, setTrendingHashtags] = useState<TrendingWord[]>();


	

	// check whether words ranked according to frequnecy growth have been retrieved
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
					<VStack >
						<Center>
							<Text marginBottom={"10%"} fontSize={"2xl"}  color={theme.colors.forest}>Google Trends</Text>
						</Center>
						{wordsFreqGrowth ?
							<ContentBox
								category="Word"
								statName="Growth"
								items={wordsFreqGrowth}
							/> : <div>loading</div>}
					</VStack>

				</Box>

				<Box>
					<VStack>
						<Center>
							<Text marginBottom={"10%"} fontSize={"2xl"} color={theme.colors.forest}>Instagram Hashtags</Text>
						</Center>
						{trendingHashtags ?
							<ContentBox
								category="Word"
								statName="Growth"
								items={trendingHashtags}
							/> : <div>loading</div>}
					</VStack>

				</Box>
			</SimpleGrid>

		</>
	);
};

export default HomePage;

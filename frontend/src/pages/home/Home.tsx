import { Center, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";
import theme from "../../theme";


const HomePage = () => {

	const [trendingWords, setTrendingWords] = useState<TrendingWord[] | undefined>(undefined); // use undefined as check whether loaded or not

	const [trendingWordsError, setTrendingWordsError] = useState(false);

	const [trendingHashtags, setTrendingHashtags] = useState<TrendingWord[]>();


	

	// check whether trending words have been retrieved
	if (typeof trendingWords === "undefined") {
		// dummy data while waiting for backend implementation
		setTrendingWords([{word: "word1", frequency_growth: 250, search_count: 75},
						  {word: "word2", frequency_growth: 100, search_count: 100},
						  {word: "word3", frequency_growth: 300, search_count: 25},
						  {word: "word4", frequency_growth: undefined, search_count: undefined}])
			
		/** TODO: awawaiting backend implementation
		// fetch the words
		API.getAllTrendingWords().then((trendingWords) => {
			setTrendingWords(trendingWords as TrendingWord[]);
		}).catch(() => {
			setTrendingWords([]); // set to something defined so we avoid infinite API calls
			setTrendingWordsError(!trendingWordsError);
		});
		*/
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
					search_count: -1, // dummy value
					frequency_growth: -1 // dummy value
				};
			});
			setTrendingHashtags(hashtagsMap);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});
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

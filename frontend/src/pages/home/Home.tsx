import { Center, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";
import theme from "../../theme";
import { TredningWordsFilter } from "utils/trendingWordsFilter";


const HomePage = () => {

	const [trendingGoogleWords, setTrendingGoogleWords] = useState<TrendingWord[]>();
	const [trendingHashtags, setTrendingHashtags] = useState<TrendingWord[]>();


	// This function needs to differantiate between fetching instagram data or google data.
	// Awaiting backend implementation
	useEffect(() => {

		API.getAllTrendingWords(TredningWordsFilter.FrequencyGrowth).then((trendingWords) => {
			setTrendingGoogleWords(trendingWords as TrendingWord[]);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});
		//TODO: change hardcoded "knitting" to a dynamic query
		API.getAllRelatedHashtags("knitting").then((trendingHashtags) => {
			const hashtags = trendingHashtags;
			const hashtagsMap = hashtags.map((hashtag): TrendingWord => {
				return {
					word: hashtag,
				};
			});
			setTrendingHashtags(hashtagsMap);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});
		// setTrendingWords(API.getAllTrendingWords());
	},[]);

	console.log(trendingGoogleWords);

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
						{trendingGoogleWords ?
							<ContentBox
								category="Word"
								statName="Growth"
								items={trendingGoogleWords}
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

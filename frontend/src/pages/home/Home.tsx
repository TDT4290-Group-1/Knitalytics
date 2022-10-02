import { Heading, Center, HStack, VStack, Text } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import SideBar from "components/SideBar";
import  API  from "api/api";
import {TrendingWord} from "../../../models/trendingword";
import { useState, useEffect } from "react";
import theme from "../../theme";


const HomePage = () => {

	const [trendingGoogleWords, setTrendingGoogleWords] = useState<TrendingWord[]>();
	const [trendingHashtags, setTrendingHashtags] = useState<TrendingWord[]>();


	// This function needs to differantiate between fetching instagram data or google data.
	// Awaiting backend implementation
	useEffect(() => {
		API.getAllTrendingWords().then((trendingWords) => {
			setTrendingGoogleWords(trendingWords as TrendingWord[]);
		});
		API.getAllTrendingHashtags().then((trendingHashtags) => {
			const hashtags = trendingHashtags;
			const hashtagsMap = hashtags.map((hashtag): TrendingWord => {
				return {
					word: hashtag,
				};
			});
			setTrendingHashtags(hashtagsMap);
		});
		// setTrendingWords(API.getAllTrendingWords());

	},[]);

	console.log(trendingGoogleWords);

	return (
		<>
			<SideBar/>
			<Center>
				<Heading size={"3xl"} marginBottom={"8%"} color={theme.colors.forest}>Trending words</Heading>
			</Center>
			<HStack marginLeft={"10%"}>
				<VStack marginRight={"10%"}>
					<Center>
						<Text marginBottom={"10%"} fontSize={"3xl"}  color={theme.colors.forest}>Google Trends</Text>
					</Center>
					{trendingGoogleWords ?
						<ContentBox
							category="Word"
							statName="Growth"
							items={trendingGoogleWords}
						/> : <div>loading</div>}
				</VStack>

				<VStack>
					<Center>
						<Text marginBottom={"10%"} fontSize={"3xl"} color={theme.colors.forest}>Instagram Hashtags</Text>
					</Center>
					{trendingHashtags ?
						<ContentBox
							category="Word"
							statName="Growth"
							items={trendingHashtags}
						/> : <div>loading</div>}
				</VStack>
			</HStack>
		</>
	);
};

export default HomePage;

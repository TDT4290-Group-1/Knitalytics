import { Box, Grid, GridItem, VStack, Center, chakra, Text } from "@chakra-ui/react";
import InstagramPosts from "components/InstagramPost";
import { getListLocalStorage} from "services/localStorageService";
import { useState, useEffect } from "react";
import API from "../../services/apiService";

interface HashtagData {
	hashtag: string,
	hashtagUrls: string[]
}

const HashtagsPage = () => {

	// stores all followed hashtags
	const [hashtags] = useState<string[]>(
		getListLocalStorage("followedHashtags")
			.split(",")
			.filter(element => element));

	// stores all followed hashtags and their related post urls
	const [hashtagsData, setHashtagsData] = useState<HashtagData[]>([]);

	// fetches all posts related to the followed hashtags.
	useEffect(() => {
		const fetchPosts = async () => {
			const tempHashtagsData: HashtagData[] = [];

			// loops through all followed hashtags
			for (const hashtag of hashtags) {
				try {
					//Await waits for api call to resolve promise before using variable
					const posts = await API.getRelatedPostURLS(hashtag);
					const hashtagData: HashtagData = {
						hashtag: hashtag,
						hashtagUrls: posts
					};
					tempHashtagsData.push(hashtagData);
				} catch (error) {
					console.error("Failed to fetch instagram posts: %o", error);
				}
			}
			setHashtagsData(tempHashtagsData);
		};
		fetchPosts();
	}, [hashtags]);

	return(
		<> 
			{hashtags.length>0? (
				<Grid gap={4}>
					{
						hashtagsData.map((hashtagData) => {
							return(
								<GridItem key={hashtagData.hashtag} colSpan={1} bg='hovergreen' padding={"30px"} rounded={"lg"} paddingBottom={"50px"}>
									<Box >
										<VStack>
											{<InstagramPosts URLs={hashtagData.hashtagUrls} heading={hashtagData.hashtag}></InstagramPosts>}
										</VStack>
									</Box>
								</GridItem>);
						})
					}
				</Grid>
			) : (
				<Center marginTop={"20%"}>
					<VStack>
						<chakra.h1
							textAlign={"center"}
							fontSize={"4xl"}
							py={5}
							fontWeight={"bold"}
							color={"forest"}>
						You are currently not following any hashtags 
						</chakra.h1>
						<Text color={"forest"}>
						Add hashtags to follow in the settings page
						</Text>
					</VStack>
				</Center>
			)}
		</>
	);
};

export default HashtagsPage;

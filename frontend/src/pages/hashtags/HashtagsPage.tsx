import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import InstagramPosts from "components/InstagramPost";
import { getListLocalStorage} from "api/localStorage";
import { useEffect, useState } from "react";
import API from "../../api/api";

interface HashtagData {
	hashtag: string,
	hashtagUrls: string[]
}

const HashtagsPage = () => {

	/**
     * TODO: replace urls with API data
     */
	//const urls: string[] = ["https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/"];
	const [hashtags] = useState(getListLocalStorage("followedHashtags").split(",").filter(element => {
		return element !== "";}));

	const [hashtagsData, setHashtagsData] = useState<HashtagData[]>([]);

	useEffect(() => {

		const tmpHashtagsData = hashtagsData ?? [];
		hashtags.forEach(hashtag => {
			hashtags[hashtags.indexOf(hashtag)] && API.getAllRelatedPostURLS(hashtag).then((posts)=>{
				const newObject = {
					hashtag: hashtag,
					hashtagUrls: posts
				};
				tmpHashtagsData.push(newObject);
			}).catch(error => {
				console.error("Failed to fetch instagram posts: %o", error);
			});
		});
		setHashtagsData(tmpHashtagsData);
		console.log(hashtagsData.length);
		console.log(tmpHashtagsData);
	},[]);

	return(
		<>
		hello
			{hashtagsData.length}
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
		</>
	);
};

export default HashtagsPage;

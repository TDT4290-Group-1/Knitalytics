import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import InstagramPosts from "components/InstagramPost";
import { getListLocalStorage} from "api/localStorage";
import { useState } from "react";


const HashtagsPage = () => {

	/**
     * TODO: replace urls with API data
     */
	const urls: string[] = ["https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/"];
	const [hashtags] = useState(getListLocalStorage("followedHashtags").split(",").filter(element => {
		return element !== "";}));

	return(
		<>
			<Grid gap={4}>
				
				{
					hashtags.map((hashtag) => {
						return(
							<GridItem key={hashtag} colSpan={1} bg='hovergreen' padding={"30px"} rounded={"lg"} paddingBottom={"50px"}>
								<Box >
									<VStack>
										<InstagramPosts URLs={urls} heading={hashtag}></InstagramPosts>
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

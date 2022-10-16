import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import InstagramPosts from "components/InstagramPost";


const InstagramWatchPage = () => {

	/**
     * TODO: replace urls with API data
     */
	const urls: string[] = ["https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/"];

	return(
		<>
			<Grid gap={4}>
				<GridItem colSpan={1} bg='hovergreen' padding={"10px"} rounded={"lg"} paddingBottom={"50px"}>
					<Box >
						<VStack>
							<InstagramPosts URLs={urls} heading={"Instagram posts with hashtag marius"}></InstagramPosts>
						</VStack>
					</Box>
				</GridItem>

				<GridItem colSpan={1} bg='hovergreen' padding={"10px"} rounded={"lg"} paddingBottom={"30px"}>
					<Box >
						<VStack>
							<InstagramPosts URLs={urls} heading={"Instagram posts with hashtag genser"}></InstagramPosts>
						</VStack>
					</Box>
				</GridItem>
			</Grid>
		</>
	);
};

export default InstagramWatchPage;

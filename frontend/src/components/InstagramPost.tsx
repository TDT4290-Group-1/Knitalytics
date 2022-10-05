import {  chakra, Grid, GridItem, VStack } from "@chakra-ui/react";

import { InstagramEmbed } from "react-social-media-embed";

export default function InstagramPosts(){
	//DUMMY LINKS: REPLACE WITH LINKS FROM API
	const urls: string[] = ["https://www.instagram.com/p/CUbHfhpswxt/","https://www.instagram.com/p/CUbHfhpswxt/","https://www.instagram.com/p/CUbHfhpswxt/","https://www.instagram.com/p/CUbHfhpswxt/","https://www.instagram.com/p/CUbHfhpswxt/","https://www.instagram.com/p/CUbHfhpswxt/"];
	return(
		<VStack>
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={7}
				fontWeight={"bold"}
				color={"hovergreen"}>
								Posts with this hashtag
			</chakra.h1>
			<Grid
				h='auto'
				templateRows='auto'
				templateColumns='repeat(3, 1fr)'
				gap={6}
				padding={3}
			>
				{urls.map(u => <GridItem key={u} colSpan={1} rounded={"lg"} paddingLeft={"10px"}> 			
					<InstagramEmbed url={u} width={328} />
				</GridItem>)}
			
			</Grid>
		</VStack>


	);


}

import {  chakra, Grid, GridItem, VStack } from "@chakra-ui/react";
import { InstagramEmbed } from "react-social-media-embed";


interface Props{
	URLs: string[];
	heading: string;
}

export default function InstagramPosts({URLs, heading}:Props){
	
	return(
		<VStack>
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={7}
				fontWeight={"bold"}
				color={"hovergreen"}>
				{heading}
			</chakra.h1>
			<Grid
				h='auto'
				templateRows='auto'
				templateColumns='repeat(3, 1fr)'
				gap={6}
				padding={3}
			>
				{URLs.map(u => <GridItem key={u} colSpan={1} rounded={"lg"} paddingLeft={"10px"}> 			
					<InstagramEmbed url={u} width={328}/>
				</GridItem>)}
			
			</Grid>
		</VStack>


	);


}

import {  chakra, SimpleGrid, GridItem, VStack, Text } from "@chakra-ui/react";
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
				color={"forest"}>
				{heading}
			</chakra.h1>
			{URLs.length>0? (
				<SimpleGrid
					columns={{ base: 1, sm: 1, md:1, lg:3}} 
					spacing={{ base: 3, lg: 5 }}
				>
					{URLs.map(u => <GridItem key={u}> 			
						<InstagramEmbed url={u} width={328}/>
					</GridItem>)}
				</SimpleGrid>) : (
				<Text>Could not find any related posts</Text>
			)
			}
		</VStack>
	);


}

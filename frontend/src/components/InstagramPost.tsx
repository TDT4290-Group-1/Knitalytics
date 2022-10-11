import {  chakra, SimpleGrid, GridItem, VStack } from "@chakra-ui/react";
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
			<SimpleGrid
				columns={{ base: 1, sm: 1, md:1, lg:3}} 
				spacing={{ base: 3, lg: 5 }}
				// minChildWidth='328px' spacing='0px' 
			>
				{URLs.map(u => <GridItem key={u}> 			
					<InstagramEmbed url={u} width={328}/>
				</GridItem>)}
			
			</SimpleGrid>
		</VStack>


	);


}

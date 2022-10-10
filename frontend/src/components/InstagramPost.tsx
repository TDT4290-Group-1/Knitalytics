import {  chakra, Grid, GridItem, VStack } from "@chakra-ui/react";

import { InstagramEmbed } from "react-social-media-embed";
import { useState, useEffect } from "react";
import API from "../api/api";



export default function InstagramPosts(){
	
	const [popularPostUrls, setPopularPostUrls] = useState<string[]>();

	useEffect(() => {
		let word = sessionStorage.getItem("word");
		if (word) {
			word = word.replace(/\s/g, "");
			API.getAllRelatedPostURLS(word).then((popularPost)=>{
				setPopularPostUrls(popularPost);
				console.log(popularPost);
			}).catch(error => {
				console.error("Failed to fetch instagram posts: %o", error);
			});
		}
	},[]);
	
	return(
		<VStack>
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={7}
				fontWeight={"bold"}
				color={"hovergreen"}>
								Most popular Instagram posts with this hashtag
			</chakra.h1>
			<Grid
				h='auto'
				templateRows='auto'
				templateColumns='repeat(3, 1fr)'
				gap={6}
				padding={3}
			>
				{popularPostUrls && popularPostUrls.map(u => <GridItem key={u} colSpan={1} rounded={"lg"} paddingLeft={"10px"}> 			
					<InstagramEmbed url={u} width={328}/>
				</GridItem>)}
			
			</Grid>
		</VStack>


	);


}

import {
	Box,
	chakra,
	Tag,
	TagLabel,
	TagLeftIcon,
	VStack,

} from "@chakra-ui/react";
import { BiHash} from "react-icons/bi";
import { useState, useEffect } from "react";
import API from "../api/api";

interface RelationProps {
	heading: string;
	type: string;
}

// Top layer word for api-call is in sessionstorage
// const word = sessionStorage.getItem("word");
// interface words{
// 	text: string,
// 	value: number
// }

export default function RelatedWords({ heading, type}: RelationProps) {

	const [trendingHashtags, setTrendingHashtags] = useState<string[]>();

	useEffect(() => {
		
		//TODO: change hardcoded "knitting" to a dynamic query
		API.getAllRelatedHashtags("knitting").then((trendingHashtags) => {
			setTrendingHashtags(trendingHashtags);
			// const hashtags = trendingHashtags;
			// const hashtagsMap = hashtags.map((hashtag): string => {
			// 	return {
			// 		word: hashtag,
			// 	};
			// });
			// setTrendingHashtags(hashtagsMap);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});
		// setTrendingWords(API.getAllTrendingWords());
	},[]);
	
	

	function getRelatedWords(){
		if (type==="instagram" && trendingHashtags){
			return trendingHashtags;
		}
		else {
			//fetch google trends related searches into list
			//TMP DUMMY:
			return [];
		}
	}
    
	return (
		
		<VStack marginBottom={"15%"}>
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={10}
				fontWeight={"bold"}
				color={"forest"}>
				{heading} 
			</chakra.h1>
			<Box textAlign={"center"} >

				{trendingHashtags && getRelatedWords().map(word => 
					<Tag size={"lg"} key={word} variant='subtle' colorScheme={"green"} margin={"1%"}>
						<TagLeftIcon boxSize='12px' as={BiHash} />
						<TagLabel>{word}</TagLabel>
					</Tag>)}
			</Box>
		</VStack>
		
		
	);

}

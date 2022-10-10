import {
	Box,
	chakra,
	Tag,
	TagLabel,
	TagLeftIcon,
	VStack,

} from "@chakra-ui/react";
import { BiHash} from "react-icons/bi";

interface RelationProps {
	heading: string;
	type: string;
}

// Top layer word for api-call is in sessionstorage
// const word = sessionStorage.getItem("word");
interface words{
	text: string,
	value: number
}

export default function RelatedWords({ heading, type}: RelationProps) {
	
	// REPLACE WORDS WITH API DATA  
	const dummywords = [{
		text: "Marine",
		value: 24
	},
	{
		text: "Purple Heart",
		value: 23
	},
	{
		text: "Honor",
		value: 16
	},
	{
		text: "Brave",
		value: 17
	},
	{
		text: "Wise",
		value: 34
	},
	{
		text: "Hero",
		value: 21
	},];

	function getRelatedWords(){
		let relatedWords: words[];
		if (type==="instagram"){
			//fetch instagram hastags into list
			//TMP DUMMY:
			relatedWords = dummywords;
		}
		else {
			//fetch google trends related searches into list
			//TMP DUMMY:
			relatedWords = dummywords;
		}
		return relatedWords;

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

				{getRelatedWords().map(word => 
					<Tag size={"lg"} key={word.text} variant='subtle' colorScheme={"green"} margin={"1%"}>
						<TagLeftIcon boxSize='12px' as={BiHash} />
						<TagLabel>{word.text}</TagLabel>
					</Tag>)}
			</Box>
		</VStack>
		
		
	);

}

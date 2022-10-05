import {
	Box,
	chakra,
	Tag,
	TagLabel,
	TagLeftIcon,
	VStack,

} from "@chakra-ui/react";
import { BiHash} from "react-icons/bi";


export default function RelatedHashtags() {
	
	// DUMMY WORDS UNDER 
	const words = [{
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
    
	return (
		
		<VStack marginBottom={"15%"}>
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={10}
				fontWeight={"bold"}
				color={"forest"}>
								Hashtaghs used together with this word 
			</chakra.h1>
			<Box textAlign={"center"} >

				{words.map(word => 
					<Tag size={"lg"} key={word.text} variant='subtle' colorScheme={"green"} margin={"1%"}>
						<TagLeftIcon boxSize='12px' as={BiHash} />
						<TagLabel>{word.text}</TagLabel>
					</Tag>)}
			</Box>
		</VStack>
		
		
	);

}

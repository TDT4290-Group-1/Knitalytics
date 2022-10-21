import {
	Box,
	chakra,
	Tag,
	TagLabel,
	TagLeftIcon,
	VStack,
	Text

} from "@chakra-ui/react";
import { BiHash} from "react-icons/bi";

interface RelationProps {
	heading: string;
	type: string;
	relatedWords: string[];
}

export default function RelatedWords({ heading, type, relatedWords}: RelationProps) {

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
				{relatedWords.length>0 ? (relatedWords.map(word => 
					<Tag size={"lg"} key={word} variant='subtle' colorScheme={"green"} margin={"1%"}>
						{type === "instagram" && <TagLeftIcon boxSize='12px' as={BiHash} />}
						<TagLabel>{word}</TagLabel>
					</Tag>)) : (
					type === "google"? (
						<Text color={"forest"} padding={"10px"}>
							Could not find any related search terms
						</Text>
					):(
						<Text color={"forest"} padding={"10px"}>
							Could not find any related hashtags
						</Text>
					)
				)}
			</Box>
		</VStack>

	);

}

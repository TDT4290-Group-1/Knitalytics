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

				{relatedWords.map(word => 
					<Tag size={"lg"} key={word} variant='subtle' colorScheme={"green"} margin={"1%"}>
						{type === "instagram" && <TagLeftIcon boxSize='12px' as={BiHash} />}
						<TagLabel>{word}</TagLabel>
					</Tag>)}
			</Box>
		</VStack>

	);

}

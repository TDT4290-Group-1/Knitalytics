import { HStack, Text, Button, Center} from "@chakra-ui/react";

interface HashtagBoxProps {
    name: string,
}

const HashtagBox = ({ name }: HashtagBoxProps) => {

	const deleteHashtag = () => { 
		// TODO: replace with inline clickons with navigate
		console.log("clicked");
	};

	return (
		<Center bg="sleekgrey" color="white" p="5px" borderRadius={10}>
			<HStack spacing={5}>
				<Text>{"#" + name}</Text>
				<Button color="white" variant='link' onClick={deleteHashtag}>x</Button>
			</HStack>
		</Center>
	);
};

export default HashtagBox;

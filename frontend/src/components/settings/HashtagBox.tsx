import { Tag, TagLabel, TagCloseButton} from "@chakra-ui/react";

interface HashtagBoxProps {
    name: string,
	deleteCallback: () => void,
}

const HashtagBox = ({ name, deleteCallback }: HashtagBoxProps) => {

	return (
		<Tag
			size="lg"
			key="md"
			borderRadius='full'
			variant='solid'
			colorScheme="teal"
			m={1}
			data-testid="hashtag-box"

		>
			<TagLabel>{name}</TagLabel>
			<TagCloseButton onClick={() => deleteCallback()}/>
		</Tag>
	);
};

export default HashtagBox;

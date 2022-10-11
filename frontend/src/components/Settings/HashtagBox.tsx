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
			colorScheme="green"
			m={3}
		>
			<TagLabel>{name}</TagLabel>
			<TagCloseButton onClick={() => deleteCallback()}/>
		</Tag>
	);
};

export default HashtagBox;

import { Flex, Text, SimpleGrid, Center, VStack } from "@chakra-ui/react";
import HashtagBox from "./HashtagBox";

interface SettingsBoxProps {
    title: string,
    storagePath?: string,
    
}
const SettingsBox = ({title, storagePath} : SettingsBoxProps) => {
	return (
		<VStack>
			<Center borderBottom="black">
				<Text marginBottom={"10%"} fontSize={"2xl"}  color="forest">{title}</Text>
			</Center>
			<SimpleGrid minChildWidth="100px" spacing={10} w="100%">
				<HashtagBox name="yarn"></HashtagBox>
				<HashtagBox name="knitt"></HashtagBox>
				<HashtagBox name="strikk"></HashtagBox>
			</SimpleGrid>
		</VStack>
	);
};

export default SettingsBox;

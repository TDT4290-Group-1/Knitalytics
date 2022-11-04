import {HStack, VStack, IconButton, StackDivider, Spacer, Link} from "@chakra-ui/react";
import {FaTrash} from "react-icons/fa";

interface Link{
    id: string;
	text: string;
	url: string;
}

function LinkList(props: {links: Link[], deleteLink: (id: string) => void}) {

	return (
		<VStack
			divider={<StackDivider />} 
			borderRadius='lg' 
			borderColor="gray.200" 
			borderWidth="2px" p="4" 
			width="100%" 
			alignItems="strech"
			maxW={{base: "80vw", sm: "70vw", lg: "60vw", xl: "50vw"}}
		>
			{props.links.map(link => (
				<HStack key={link.id}>
					<Link color="teal.500" href={link.url} isExternal>{link.text}</Link>
					<Spacer />
					<IconButton icon={<FaTrash />} aria-label={""} onClick={() => props.deleteLink(link.id)}/>
				</HStack>
			))}
		</VStack>
	);
}

export default LinkList;

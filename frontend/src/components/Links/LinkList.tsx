import React, {useState} from "react";
import {HStack, VStack, Text, IconButton, StackDivider, Spacer} from "@chakra-ui/react";
import {FaTrash} from "react-icons/fa";

interface Link{
    id: number;
	body: string;
}

function LinkList({ links, deleteLink}) {

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
			{links.map(link => (
				<HStack key={link.id}>
					<Text>{link.body}</Text>
					<Spacer />
					<IconButton icon={<FaTrash />} aria-label={""} onClick={() => deleteLink(link.id)}/>
				</HStack>
			))}
		</VStack>
	);
}

export default LinkList;

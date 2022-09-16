import React from "react";
import { Flex, Center, HStack, VStack, Text, Spacer, Divider } from "@chakra-ui/react";

interface Item {
    name: string;
    value: string;
}

interface Props {
    category: string;
    statName: string;
    items: Item[];
}

const ContentBox: React.FC<Props> = ({ category, statName, items }: Props) => {
	return (
		<Center>
			<Flex bg="mediumGrey">
				<VStack w="70vw">
					<HStack p="50px 300px 5px 50px" w="100%">
						<Text fontSize="2xl">{category}</Text>
						<Spacer/>
						<Text fontSize="2xl">{statName}</Text>
					</HStack>
					<Divider borderColor={"black"} w="90%"/>
					<HStack p="5px 320px 5px 50px" w="100%">
						<VStack align="left">
							{items.map((item, index) => {
								return (<Text key={index} fontSize="3xl">
									{`${index + 1}. ${item.name}`}
								</Text>);
							}
							)};
						</VStack>
						<Spacer/>
						<VStack align="left">
							{items.map((item, index) => {
								return (<Text key={index} fontSize="3xl">
									{` ${item.value}`}
								</Text>);
							}
							)};
						</VStack>
					</HStack>
				</VStack>
			</Flex>
		</Center>
	);
};

export default ContentBox;

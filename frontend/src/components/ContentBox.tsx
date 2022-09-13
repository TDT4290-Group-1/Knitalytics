import React from "react";
import { Flex, Heading, Center, HStack, VStack, Text } from "@chakra-ui/react";

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
		<Flex>
			<Center>
				<Flex>
					<HStack>
						<Heading>{category}</Heading>
						<Heading>{statName}</Heading>
					</HStack>
					<VStack>
						{items.map((item, index) => {
							return (<Text>
                                `${index + 1}`. `${item.name}`
							</Text>);
						}
						)};
					</VStack>
				</Flex>
			</Center>
		</Flex>
	);
};

export default ContentBox;

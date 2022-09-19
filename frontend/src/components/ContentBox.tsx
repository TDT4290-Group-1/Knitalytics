import React from "react";
import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody } from "@chakra-ui/react";

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
			<TableContainer w="60vw" p="20px" bg="mediumGrey">
				<Table variant='unstyled'>
					<Thead>
						<Tr borderBottom="2px" w="90%">
							<Th textTransform="lowercase" fontSize="2xl">{category}</Th>
							<Th textTransform="lowercase" fontSize="2xl">{statName}</Th>
						</Tr>
					</Thead>
					<Tbody>
						{items.map((item, index) => {
							return (<Tr key={index}>
								<Td fontSize="3xl" p="20px">{`${index + 1}. ${item.name}`}</Td>
								<Td fontSize="3xl" p="20px">{`${item.value}`}</Td>
							</Tr>);})}
					</Tbody>
				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;

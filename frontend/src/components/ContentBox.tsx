import React, { useState } from "react";
import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Switch, HStack } from "@chakra-ui/react";
import { TiSortNumerically } from "react-icons/ti";
import { BsPercent } from "react-icons/bs";
import theme from "theme";

interface Item {
    name: string;
    value: string;
	value2: string;
}

interface Props {
    category: string;
    statName: string;
    items: Item[];
}

const ContentBox: React.FC<Props> = ({ category, statName, items }: Props) => {
	const [toggle, setToggle] = useState(false);

	function toggleSwitch() {
		setToggle(!toggle);
	}

	return (
		<Center>
			<TableContainer w="60vw" p="20px">
				<Table variant='unstyled'>
					<Thead>
						<Tr borderBottom="2px" w="90%">
							<Th textTransform="lowercase" fontSize="2xl">{category}</Th>
							<Th textTransform="lowercase" fontSize="2xl">{statName}</Th>
							<Th pr="0px">
								<HStack justifyContent="flex-end">
									<BsPercent size="18px" color={theme.colors.forest}/>
									<Switch size='md' onChange={toggleSwitch}/>
									<TiSortNumerically size="20px" color={theme.colors.forest}/>
								</HStack>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{items.map((item, index) => {
							return (<Tr key={index}>
								<Td fontSize="3xl" p="20px">{`${index + 1}. ${item.name}`}</Td>
								{ toggle ? 
									<Td fontSize="3xl" p="20px">{`${item.value2}`}</Td> :
									<Td fontSize="3xl" p="20px">{`${item.value}`}</Td>
								}
							</Tr>);})}
					</Tbody>
				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


import React, { useState } from "react";
import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Switch, HStack } from "@chakra-ui/react";
import { TiSortNumerically } from "react-icons/ti";
import { BsPercent } from "react-icons/bs";
import theme from "theme";
import { TrendingWord } from "../../models/trendingword";


interface Props {
    category: string;
    statName: string;
    items: TrendingWord[];
}

const ContentBox: React.FC<Props> = ({ category, statName, items }: Props) => {

	console.log("HJEHJEH", items);
	const [toggle, setToggle] = useState(false);

	function toggleSwitch() {
		setToggle(!toggle);
	}



	return (
		<Center>
			<TableContainer w="60vw" p="50px">
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
				
						{items.sort((o1, o2) => toggle ? (o1.frequency_growth<o2.frequency_growth ? 1 : -1) : ( o1.search_count<o2.search_count ? 1:-1)).map((item, index) => {
							return (<Tr key={index}>
								<Td fontSize="3xl" p="20px">{`${index + 1}. ${item.word}`}</Td>
								{ toggle ? 
									<Td fontSize="3xl" p="20px">{item.frequency_growth}</Td>:
									<Td fontSize="3xl" p="20px">{item.search_count}</Td> 
								}
							</Tr>);})}
					</Tbody>
				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


import React, { useState } from "react";
import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Switch, HStack } from "@chakra-ui/react";
import { TiSortNumerically } from "react-icons/ti";
import { BsPercent } from "react-icons/bs";
import theme from "../theme";
import { TrendingWord } from "../../models/trendingword";


interface Props {
    category: string;
    statName: string;
    items: TrendingWord[];
}

const ContentBox: React.FC<Props> = ({ category, statName, items }: Props) => {

	const [toggle, setToggle] = useState(true);

	function toggleSwitch() {
		setToggle(!toggle);
	}


	return (
		<Center>
			
			<TableContainer >
				<Table variant='simple' color={theme.colors.forest}>
					<Thead>
					
						<Tr borderBottom="2px" color={theme.colors.forest}>
							<Th  fontSize="l">{category}</Th>
							<Th fontSize="l" isNumeric>{statName}
								<HStack justifyContent="flex-end" marginTop={"4%"}>
									<BsPercent size="18px" color={theme.colors.forest}/>
									<Switch size='md' onChange={toggleSwitch} colorScheme={theme.colors.forest}/>
									<TiSortNumerically size="20px" color={theme.colors.forest}/>
								</HStack>
							</Th>
						</Tr>
						
					</Thead>
					<Tbody>

						{items.sort((o1, o2) => toggle ? (o1.frequency_growth<o2.frequency_growth ? 1 : -1) : ( o1.search_count<o2.search_count ? 1:-1)).map((item, index) => {
							return (<Tr key={index}>
								<Td fontSize="xl" >{`${index + 1}. ${item.word}`}</Td>
								{ toggle ? 
									<Td fontSize="l"  isNumeric>{item.frequency_growth}</Td>:
									<Td fontSize="l" isNumeric>{item.search_count}</Td> 
								}
							</Tr>);})}
					</Tbody>
				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


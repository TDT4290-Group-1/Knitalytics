import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import theme from "../theme";
import { TrendingWord } from "../../models/trendingword";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
    items: TrendingWord[] | undefined;
}


const ContentBox: React.FC<Props> = ({ items }: Props) => {

	const navigate = useNavigate();

	const [displayFrequencyGrowth, setDisplayFrequencyGrowth] = useState(false);

	// helper variable to determine display and sorting value

	return (
		<Center>
			<TableContainer maxHeight={"500px"} overflowY={"scroll"}>
				<Table variant='simple' color={theme.colors.forest} size={"sm"}>
					<Thead>
						<Tr borderBottom="2px" color={theme.colors.forest}>
							<Th  fontSize="sm">Word</Th> {/** The table always display words */}
							<Th fontSize="sm" isNumeric paddingRight={0}>
								<Menu> 
									<MenuButton as={Button} rightIcon={<ArrowDownIcon />} 
												onClick={() => setDisplayFrequencyGrowth(!displayFrequencyGrowth)}>
										{displayFrequencyGrowth ? "Frequency growth" : "Search count"}
									</MenuButton>
									<MenuList>
										<MenuItem onClick={() => setDisplayMetric(TredningWordsFilter.FrequencyGrowth)}>
											Frequency growth
										</MenuItem>
										<MenuItem onClick={() => setDisplayMetric(TredningWordsFilter.SearchCount)}>
											Search count
										</MenuItem>
									</MenuList>

								</Menu>	
							</Th>
							
							{/* <Th fontSize="sm" isNumeric paddingRight={0}>count
								{toggle && 
								<IconButton colorScheme={"white"} size={"xs"} padding={0} icon={<ArrowDownIcon color={"forest"}/>} aria-label={"sort"} onClick={toggleSwitch}></IconButton>
								}
							</Th> */}
						</Tr>
					</Thead>

					<Tbody >

						{items?.sort((word1, word2) => word1.metric < word2.metric ? 1 : -1)
							.map((item: TrendingWord, index: number) => {
							return (<Tr key={index}>
								<Td fontSize="sm" onClick={()=>navigate("/context")}
									_hover={{
										color: "hovergreen",
									}}
								>{`${index + 1}. ${item.word}`}</Td>
								<Td fontSize="sm"  isNumeric>{item.metric}</Td>
								{/* <Td fontSize="sm" isNumeric>{item.search_count}</Td>  */}
							</Tr>);})}
					</Tbody>

				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


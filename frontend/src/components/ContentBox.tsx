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

	// are we displaying frequency growth? If not, we are displaying search count
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
								</Menu>	
							</Th>
						</Tr>
					</Thead>

					<Tbody >

						{items?.sort((word1, word2) => 
							(displayFrequencyGrowth ? // if we are displaying frequency growth
								(word1.frequency_growth < word2.frequency_growth) : // sort on that
								(word1.search_count < word2.search_count)) // else sort on search count
									? 1 : -1) // larger
							.map((item: TrendingWord, index: number) => {
							return (<Tr key={index}>
								<Td fontSize="sm" onClick={()=>navigate("/context")}
									_hover={{
										color: "hovergreen",
										cursor: "pointer"
									}}
								>{`${index + 1}. ${item.word}`}</Td>
								<Td fontSize="sm"  isNumeric>{displayFrequencyGrowth ? item.frequency_growth : item.search_count}</Td>
								{/* <Td fontSize="sm" isNumeric>{item.search_count}</Td>  */}
							</Tr>);})}
					</Tbody>

				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


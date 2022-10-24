import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Button, Checkbox, Flex, HStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import theme from "../theme";
import { TrendingWord } from "../../models/trendingword";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { SelectedWordContext } from "context/selectedWordContext";
import ToolTip from "./ToolTip";

interface Props {
    items: TrendingWord[] | undefined;
	setTrendingWords: (trendingWords: TrendingWord[] | undefined) => void;
	setFilter: (error: boolean) => void;
}


const ContentBox: React.FC<Props> = ({ items, setTrendingWords, setFilter }: Props) => {

	const {setTrendingWord} = useContext(SelectedWordContext);

	const navigate = useNavigate();

	// are we displaying frequency growth? If not, we are displaying search count
	const [displayFrequencyGrowth, setDisplayFrequencyGrowth] = useState(false);

	function nav(word: TrendingWord){
		setTrendingWord(word);
		navigate("/GoogleDetails");
	}

	function onCheckboxChanged(checked: boolean) {
		setTrendingWords(undefined);
		setFilter(checked);
	}

	function sortWords(word1: TrendingWord, word2: TrendingWord) {
		if (displayFrequencyGrowth) {
			if (typeof word1.frequency_growth === "undefined") {
				return 1;
			} else if (typeof word2.frequency_growth === "undefined") {
				return -1;
			}
			return word2.frequency_growth - word1.frequency_growth;
		} else {
			if (typeof word1.search_count === "undefined") {
				return 1;
			} else if (typeof word2.search_count === "undefined") {
				return -1;
			}
			return word2.search_count - word1.search_count;
		}
	}


	return (
		<Center >
			<TableContainer maxHeight={"60vh"} overflowY={"scroll"} minWidth={"65%"} borderRadius={"lg"}>
				<Table variant='simple' color={theme.colors.forest} size={"md"} background={theme.colors.palehovergreen}>
					<Thead position="sticky" top={0} bgColor={theme.colors.lighthovergreen}>
						<Tr borderBottom="2px" color={theme.colors.forest} borderRadius={"lg"} justifyContent="space-between">
							<Th  fontSize="sm">Word</Th> 
							<Th fontSize="sm" isNumeric margin="2%" width="100%">
								<Flex alignItems={"center"} justifyContent="flex-end"> 
									<HStack>
										<ToolTip tooltip="Filter out all results that is also among top results the past twelve months"/>
										<Checkbox colorScheme='red' 
											border="black" 
											size="sm"
											margin="2%"
											onChange={(e) => onCheckboxChanged(e.target.checked)}
										>
										Filter
										</Checkbox>
									</HStack>
									<Button rightIcon={<ArrowDownIcon/>}
										justifyContent="flex-end"
										onClick={() => setDisplayFrequencyGrowth(!displayFrequencyGrowth)}
										minWidth="194px"
										variant={"ghost"}
									>
										{displayFrequencyGrowth ? "Frequency growth" : "Search count"}
											
									</Button>
								</Flex>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{items?
							items?.sort((word1, word2) => sortWords(word1, word2))
								.map((item: TrendingWord, index: number) => {
									if ((displayFrequencyGrowth && item.frequency_growth !== null) || (!displayFrequencyGrowth && item.search_count !== null)) {
										return (<Tr key={index}>
											<Td fontSize="sm" onClick={()=>nav(item)}
												_hover={{
													color: "hovergreen",
													cursor: "pointer"
												}}
											>{`${index + 1}. ${item.word}`}</Td>
											<Td fontSize="sm"  isNumeric>{displayFrequencyGrowth ? item.frequency_growth : item.search_count}</Td>
										</Tr>);
									} else {
										return;
									}
								}):<Tr><Td>Loading...</Td></Tr>
						}
					</Tbody>
				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Button, Checkbox, Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import theme from "../theme";
import { TrendingWord } from "../models/trendingword";
import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { SelectedWordContext } from "context/selectedWordContext";
import ToolTip from "./ToolTip";

interface Props {
    items: TrendingWord[] | undefined;
	setTrendingWords: (trendingWords: TrendingWord[] | undefined) => void;
	filter: boolean;
	setFilter: (error: boolean) => void;
	timeframe: string;
	setTimeframe: (timeframe: string) => void;
}


const ContentBox: React.FC<Props> = ({ items, setTrendingWords, filter, setFilter, timeframe, setTimeframe }: Props) => {

	// conversion from timeframe string to formatted labels to display in dropdown menu
	const TIMEFRAME_LABELS = {
		"last_day": "Last day", 
		"last_week": "Last week", 
		"last_month": "Last month", 
		"last_three_months": "Last three months", 
		"last_twelve_months": "Last year"
	};

	console.log(`Filter: ${filter}`);

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
		sessionStorage.wordFilter = checked;
	}

	function timeFrameClicked(timeframe: string) {
		setTrendingWords(undefined); // we have to retrieve words again
		setTimeframe(timeframe); // set the new timeframe
		sessionStorage.wordTimeframe = timeframe;
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

	console.log(Object.entries(TIMEFRAME_LABELS));

	return (
		<Center >
			<TableContainer minHeight={"40vh"} maxHeight={"60vh"} overflowY={"scroll"} minWidth={"65%"} borderRadius={"lg"}>
				<Table variant='simple' color={theme.colors.forest} size={"md"} background={theme.colors.palehovergreen}>
					<Thead position="sticky" top={0} bgColor={theme.colors.lighthovergreen}>
						<Tr borderBottom="2px" color={theme.colors.forest} borderRadius={"lg"} justifyContent="space-between">
							<Th  fontSize="sm">Word</Th> 
							<Th fontSize="sm" isNumeric margin="2%" width="100%">
								<Flex alignItems={"center"} justifyContent="flex-end">
									<ToolTip tooltip="Filter out all results that is also among top results the past twelve months"/>
									<Checkbox colorScheme='red' 
										border="black" 
										size="sm"
										margin="2%"
										isChecked={filter}
										onChange={(e) => onCheckboxChanged(e.target.checked)}
									>
										Filter
									</Checkbox>
									<Menu>
										<MenuButton as={Button} rightIcon={<ChevronDownIcon/>} 
											size="sm" variant={"ghost"}>
											{TIMEFRAME_LABELS[timeframe]}
										</MenuButton>
										<MenuList>
											{/* Iteratively extract the timeframe string and formatted label */}
											{Object.entries(TIMEFRAME_LABELS).map((timeframe_label) => { 
												const name = timeframe_label[0];
												const label = timeframe_label[1];
												return <MenuItem key={name} name={name} onClick={e => {timeFrameClicked(e.currentTarget.name);}}>
													{label} {/* Formatted label */}
												</MenuItem>;
											})
											}
										</MenuList>
									</Menu>
									<Button rightIcon={<ArrowDownIcon/>}
										justifyContent="flex-end"
										onClick={() => setDisplayFrequencyGrowth(!displayFrequencyGrowth)}
										minWidth="194px"
										variant={"ghost"}
									>
										{displayFrequencyGrowth ? "Frequency growth" : "Search count"}
											
									</Button>
									{displayFrequencyGrowth ? (
										<ToolTip tooltip="Showing top list of search terms with the highest persentage increase. Click button to show search count."/>	

									) : (
										<ToolTip tooltip="Showing top list of search terms with the highest relative count. Click button to show Frequency growth."/>
									)}
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


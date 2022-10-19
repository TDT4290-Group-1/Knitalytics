import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Button, Menu, MenuButton } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import theme from "../theme";
import { TrendingWord } from "../../models/trendingword";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { SelectedWordContext } from "context/selectedWordContext";

interface Props {
    items: TrendingWord[] | undefined;
	tabletype: string;
}


const ContentBox: React.FC<Props> = ({ items, tabletype }: Props) => {

	const {setTrendingWord} = useContext(SelectedWordContext);

	const navigate = useNavigate();

	// are we displaying frequency growth? If not, we are displaying search count
	const [displayFrequencyGrowth, setDisplayFrequencyGrowth] = useState(false);

	function nav(word: TrendingWord){
		if (tabletype==="instagram"){
			setTrendingWord(word);
			navigate("/InstagramContext");
		}
		else {
			setTrendingWord(word);
			navigate("/GoogleDetails");
		}
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
			<TableContainer maxHeight={"400px"}  overflowY={"scroll"} minWidth={"468px"} borderRadius={"lg"}>
				<Table variant='simple' color={theme.colors.forest} size={"md"} background={theme.colors.palehovergreen}>
					<Thead position="sticky" top={0} bgColor={theme.colors.lighthovergreen}>
						<Tr borderBottom="2px" color={theme.colors.forest} borderRadius={"lg"}>
							<Th  fontSize="sm">Word</Th> 
							<Th fontSize="sm" isNumeric paddingRight={"12px"}>
								<Menu > 
									<MenuButton as={Button} rightIcon={<ArrowDownIcon />} 
										onClick={() => setDisplayFrequencyGrowth(!displayFrequencyGrowth)}
										minWidth={"194px"}
										variant={"ghost"}
									>
										{displayFrequencyGrowth ? "Frequency growth" : "Search count"}
										
									</MenuButton>
								</Menu>	
							</Th>
						</Tr>
					</Thead>
					<Tbody>

						{items?.sort((word1, word2) => sortWords(word1, word2))
							.map((item: TrendingWord, index: number) => {
								return (<Tr key={index}>
									<Td fontSize="sm" onClick={()=>nav(item)}
										_hover={{
											color: "hovergreen",
											cursor: "pointer"
										}}
									>{`${index + 1}. ${item.word}`}</Td>
									<Td fontSize="sm"  isNumeric>{displayFrequencyGrowth ? item.frequency_growth : item.search_count}</Td>
								</Tr>);})}
					</Tbody>

				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


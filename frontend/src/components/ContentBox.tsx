import React, { useState } from "react";
import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import theme from "../theme";
import { TrendingWord } from "../../models/trendingword";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { TredningWordsFilter } from "utils/trendingWordsFilter";

interface Props {
    displayMetric: string;
    items: TrendingWord[] | undefined;
	setDisplayMetric: (displayMetric: TredningWordsFilter) => void;
}


const ContentBox: React.FC<Props> = ({ items, displayMetric, setDisplayMetric }: Props) => {

	const navigate = useNavigate();


	return (
		<Center>
			<TableContainer maxHeight={"500px"} overflowY={"scroll"}>
				<Table variant='simple' color={theme.colors.forest} size={"sm"}>

					<Thead position="sticky" >
					
						<Tr borderBottom="2px" color={theme.colors.forest}>
							<Th  fontSize="sm">Word</Th> {/** The table always display words */}
							<Th fontSize="sm" isNumeric paddingRight={0}>
								<Menu> 
									<MenuButton as={Button} rightIcon={<ArrowDownIcon />}>
										{displayMetric} {/**TODO: display human readable format */}
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

						{items.sort((o1, o2) => toggle ? ((o1.frequency_growth ?? 0) < (o2.frequency_growth ?? 0) ? 1 : -1) : ( (o1.search_count ?? 0)<(o2.search_count ?? 0) ? 1:-1)).map((item, index) => {
							return (<Tr key={index}>
								<Td fontSize="sm" onClick={()=>navigate("/context")}
									_hover={{
										color: "hovergreen",
									}}
								>{`${index + 1}. ${item.word}`}</Td>
								<Td fontSize="sm"  isNumeric>{item.frequency_growth}</Td>
								{/* <Td fontSize="sm" isNumeric>{item.search_count}</Td>  */}
							</Tr>);})}
					</Tbody>

				</Table>
			</TableContainer>
		</Center>
	);
};

export default ContentBox;


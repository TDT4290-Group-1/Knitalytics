import React, { useState } from "react";
import { Center, Table, TableContainer, Thead, Tr, Th, Td, Tbody, IconButton } from "@chakra-ui/react";
import theme from "../theme";
import { TrendingWord } from "../../models/trendingword";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface Props {
    category: string;
    statName: string;
    items: TrendingWord[];
	tabletype: string;
}


const ContentBox: React.FC<Props> = ({ category, statName, items, tabletype }: Props) => {

	const [toggle, setToggle] = useState(true);

	function toggleSwitch() {
		setToggle(!toggle);
	}

	const navigate = useNavigate();

	function nav(word: string){
		if (tabletype==="instagram"){
			sessionStorage.setItem("word", word);
			navigate("/InstagramContext");
		}
		else {
			sessionStorage.setItem("word", word);
			navigate("/GoogleContext");
		}
	}


	return (
		<Center>
			<TableContainer maxHeight={"200px"} overflowY={"scroll"}>
				<Table variant='simple' color={theme.colors.forest} size={"sm"}>

					<Thead>
					
						<Tr borderBottom="2px" color={theme.colors.forest}>
							<Th  fontSize="sm">{category}</Th>
							<Th fontSize="sm" isNumeric paddingRight={0}>{statName}
								{!toggle&&
								<IconButton colorScheme={"white"} size={"xs"} padding={0} icon={<ArrowDownIcon color={"forest"}/>} aria-label={"sort"} onClick={toggleSwitch}></IconButton>
								}
								
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
								<Td fontSize="sm" onClick={()=>nav(item.word)}
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


import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
	IconButton,
	VStack,
	Text,
	Box,
	HStack,
	Grid,
	GridItem
} from "@chakra-ui/react";
import { FrequencyStat } from "components/FrequencyStat";
import { useNavigate } from "react-router-dom";

/**
 * DONE: set up dummy grid structure
 * TODO: fill inn actual stat components and 
 * edit grid as suitable 
 */

const ContextPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<IconButton aria-label={"Back"} icon={<ChevronLeftIcon />} onClick={()=>navigate("/")}>
			</IconButton>

			<Grid
				h='auto'
				templateRows='auto'
				templateColumns='repeat(4, 1fr)'
				gap={4}
			>
				<GridItem colSpan={4} bg='papayawhip' >
					<VStack>
						<Text fontSize={"4xl"}>Topic: someTopLevelQuery</Text>
						<Text fontSize={"xl"}>Word: TheClickedWord</Text>
					</VStack>
				</GridItem>

				<GridItem colSpan={2} bg='papayawhip'>
					<Box >
						<VStack>
							<FrequencyStat/>
							<FrequencyStat/>
							<FrequencyStat/>
						</VStack>
					</Box>
				</GridItem>
				<GridItem colSpan={2} bg='papayawhip'>
					<HStack >
						<FrequencyStat/>
						<FrequencyStat/>
					</HStack>
				</GridItem>
				<GridItem colSpan={4} bg='papayawhip'>
					<Text fontSize={"2xl"} align={"center"}>Poster med dette ordet</Text>
				</GridItem>
				<GridItem colSpan={4} bg='papayawhip'>
					<HStack >
						<FrequencyStat/>
						<FrequencyStat/>
						<FrequencyStat/>
						<FrequencyStat/>
						<FrequencyStat/>
					</HStack>
				</GridItem>
			</Grid>
		</>
	);
};

export default ContextPage;

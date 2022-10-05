import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
	IconButton,
	VStack,
	Box,
	HStack,
	Grid,
	GridItem,
	Heading,
	chakra
} from "@chakra-ui/react";
import { FrequencyStat } from "components/FrequencyStat";
import InstagramPosts from "components/InstagramPost";
import RelatedHashtags from "components/RelatedHashtags";
// import WordCloud from "components/OccuringWith";
import WordStats from "components/WordStats";
import { useNavigate } from "react-router-dom";

/**
 * DONE: set up dummy grid structure
 * TODO: fill inn actual stat components and 
 * edit grid as suitable 
 * TODO: content of each gridItem could be made into component
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
				gap={6}
				padding={3}
			>
				<GridItem colSpan={1} rounded={"lg"} paddingLeft={"10px"} 
				> 			
					{/* DUMMY TEXT HERE */}
					<Heading color={"forest"} fontSize={"3xl"} as={"u"}>SEARCH</Heading>
					<Heading color={"teal"} fontSize={"3xl"} marginBottom={"6%"}> AMERICAN DREAMS</Heading>

				</GridItem>
				<GridItem colSpan={3} rounded={"lg"} textAlign={"right"} paddingRight={"10px"}
				>
					{/* DUMMY TEXT HERE */}
					<Heading color={"forest"} fontSize={"5xl"}  as={"u"} >TOPIC </Heading>
					<Heading color={"teal"} fontSize={"5xl"}>KNITTING PATTERN</Heading>  			
				</GridItem>

				<GridItem colSpan={1} bg='hovergreen' padding={"10px"} rounded={"lg"} paddingBottom={"30px"}>
					<Box >
						<VStack>
							<chakra.h1
								textAlign={"center"}
								fontSize={"4xl"}
								py={10}
								fontWeight={"bold"}
								color={"forest"}>
								How is the word doing? 
							</chakra.h1>
							<FrequencyStat/>
							<FrequencyStat/>
						</VStack>
					</Box>
				</GridItem>

				<GridItem colSpan={3} bg='itembackdrop' rounded={"lg"}>
					<HStack >
						<WordStats></WordStats>
					</HStack>
				</GridItem>

				<GridItem colSpan={4} bg='forest' padding={"3%"} rounded={"lg"} >
					<InstagramPosts></InstagramPosts>
				</GridItem>

				<GridItem colSpan={3} bg='itembackdrop' padding={"3%"} rounded={"lg"} >
					<chakra.h1
						textAlign={"center"}
						fontSize={"4xl"}
						py={10}
						fontWeight={"bold"}
						color={"forest"}>
								Some other statistics about the word 
					</chakra.h1>
				</GridItem>
				
				<GridItem colSpan={1} bg='hovergreen' padding={"3%"} rounded={"lg"} >
					<RelatedHashtags></RelatedHashtags>
				</GridItem>

			</Grid>
		</>
	);
};

export default ContextPage;

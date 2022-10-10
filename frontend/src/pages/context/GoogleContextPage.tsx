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
import RelatedWords from "components/RelatedWords";
import WordStats from "components/WordStats";
import { useNavigate } from "react-router-dom";


const GoogleContextPage = () => {
	const navigate = useNavigate();
	const word = sessionStorage.getItem("word");


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
					<Heading color={"teal"} fontSize={"3xl"} marginBottom={"6%"}> {word?.toUpperCase()}</Heading>

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
					
					<RelatedWords type="instagram" heading="Hashtags occurring in Instagram posts with this word"></RelatedWords>

				</GridItem>
				
				<GridItem colSpan={1} bg='hovergreen' padding={"3%"} rounded={"lg"} >
					<RelatedWords heading="Related Google searches" type={"google"}></RelatedWords>
				</GridItem>

			</Grid>
		</>
	);

};

export default GoogleContextPage;

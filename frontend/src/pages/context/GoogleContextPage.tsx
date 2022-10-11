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
import { useState, useEffect } from "react";
import API from "../../api/api";


const GoogleContextPage = () => {
	const navigate = useNavigate();
	const word = sessionStorage.getItem("word");

	const [trendingGoogleSearch, setTrendingGoogleSearch] = useState<string[]>();
	const [trendingHashtags, setTrendingHashtags] = useState<string[]>();
	const [popularPostUrls, setPopularPostUrls] = useState<string[]>();



	useEffect(() => {
		const word = sessionStorage.getItem("word");

		word && API.getAllRelatedHashtags(word).then((trendingHashtags) => {
			setTrendingHashtags(trendingHashtags);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});
		/**
		 * TODO: FETCH RELATED GOOGLE SEARCHES HERE
		 * REPLACE DUMMYDATA 
		 */
		setTrendingGoogleSearch(["dummyord1", "relatert søk", "tester"]);

		if (word) {
			const strippedWord = word.replace(/\s/g, "");
			API.getAllRelatedPostURLS(strippedWord).then((popularPost)=>{
				setPopularPostUrls(popularPost);
			}).catch(error => {
				console.error("Failed to fetch instagram posts: %o", error);
			});
		}
	},[]);


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
				<GridItem colSpan={1} rounded={"lg"} paddingLeft={"10px"} > 			
					<Heading color={"forest"} fontSize={"3xl"} as={"u"}>SEARCH</Heading>
					<Heading color={"teal"} fontSize={"3xl"} marginBottom={"6%"}> {word?.toUpperCase()}</Heading>
				</GridItem>

				<GridItem colSpan={3} rounded={"lg"} textAlign={"right"} paddingRight={"10px"}>
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
					{popularPostUrls && <InstagramPosts URLs={popularPostUrls}></InstagramPosts>}
				</GridItem>

				<GridItem colSpan={3} bg='itembackdrop' padding={"3%"} rounded={"lg"} >
					{trendingHashtags &&
					<RelatedWords relatedWords={trendingHashtags} 
						type="instagram" 
						heading="Hashtags occurring in Instagram posts with this word"></RelatedWords>}

				</GridItem>
				
				<GridItem colSpan={1} bg='hovergreen' padding={"3%"} rounded={"lg"} >
					{trendingGoogleSearch &&
					<RelatedWords relatedWords={trendingGoogleSearch} 
						type="google" 
						heading="Related Google searches"></RelatedWords>}
				</GridItem>

			</Grid>
		</>
	);

};

export default GoogleContextPage;

import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
	IconButton,
	Grid,
	GridItem,
	Heading,
	Button,
} from "@chakra-ui/react";
import { FrequencyStat } from "components/FrequencyStat";
import InstagramPosts from "components/InstagramPost";
import RelatedWords from "components/RelatedWords";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import API from "../../services/apiService";
import { TrendChart } from "components/TrendChart";
import { SelectedWordContext } from "context/selectedWordContext";


const GoogleDetailsPage = () => {
	const navigate = useNavigate();
	const {trendingWord} = useContext(SelectedWordContext);

	// stores all trending hashtags under the 'trendingWord'
	const [trendingHashtags, setTrendingHashtags] = useState<string[]>();

	// stores all trending posts under the 'trendingWord'
	const [popularPostUrls, setPopularPostUrls] = useState<string[]>();

	// stores all searches related  to the 'trendingWord
	const [relatedSearches, setRelatedSearches] = useState<string[]>();



	// fetches all trending hashtags, trending post urls and related searches to the 'trendingWord'
	useEffect(() => {
		trendingWord && API.getRelatedHashtags(trendingWord.word).then((trendingHashtags) => {
			setTrendingHashtags(trendingHashtags);
		}).catch(error => {
			console.error("Failed to fetch hashtags: %o", error);
		});

		const tmp: string[] = [];
		trendingWord && API.getTrendingWords(trendingWord.word, false, "").then((trendingWords) => {
			trendingWords.map(trend => tmp.push(trend.word));
			setRelatedSearches(tmp.slice(0, 10));
		}).catch(error => {
			console.error("Failed to fetch rekated searches: %o", error);
		});


		trendingWord && API.getRelatedPostURLS(trendingWord.word).then((popularPost)=>{
			setPopularPostUrls(popularPost);
		}).catch(error => {
			console.error("Failed to fetch instagram posts: %o", error);
		});
	},[]);

	// redirects the user to Google to search for the 'trendingWord'
	function openInGoogle(){
		const url = "https://google.com/search?q=" + trendingWord.word;

		window.open(url, "_blank", "noopener,noreferrer");
	}


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
				<GridItem colSpan={4} rounded={"lg"} textAlign={"right"} paddingRight={"10px"}>
					<Heading color={"forest"} fontSize={"4xl"}  as={"u"} >SEARCH </Heading>
					<Heading color={"teal"} fontSize={"4xl"}>{trendingWord.word?.toUpperCase()}</Heading>
					<Button variant={"link"} colorScheme={"teal"} onClick={() => openInGoogle()}>
						Explore search in Google
					</Button> 		
				</GridItem>
			

				<GridItem colSpan={1} bg='hovergreen' padding={"10px"} rounded={"lg"} paddingBottom={"30px"}>
					<FrequencyStat details={trendingWord}/>
				</GridItem>

				<GridItem colSpan={3} bg='itembackdrop' rounded={"lg"}>
					
					<TrendChart></TrendChart>
					
				</GridItem>

				<GridItem colSpan={4} bg="lightgreen" padding={"3%"} rounded={"lg"} >
					{popularPostUrls && <InstagramPosts URLs={popularPostUrls} heading={"Most popular Instagram posts with this hashtag"}></InstagramPosts>}
				</GridItem>

				<GridItem colSpan={3} bg='itembackdrop' padding={"3%"} rounded={"lg"} >
					{trendingHashtags &&
					<RelatedWords relatedWords={trendingHashtags} 
						type="instagram" 
						heading="Hashtags occurring in Instagram posts with this word"></RelatedWords>}

				</GridItem>
				
				<GridItem colSpan={1} bg='hovergreen' padding={"3%"} rounded={"lg"} >
					{relatedSearches &&
					<RelatedWords relatedWords={relatedSearches} 
						type="google" 
						heading="Related Google searches"></RelatedWords>}
				</GridItem>

			</Grid>
		</>
	);

};

export default GoogleDetailsPage;

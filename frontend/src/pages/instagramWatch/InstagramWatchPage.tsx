// import { ChevronLeftIcon } from "@chakra-ui/icons";
// import {
// 	IconButton,
// } from "@chakra-ui/react";
import InstagramPosts from "components/InstagramPost";
// import { useNavigate } from "react-router-dom";


const InstagramWatchPage = () => {

	/**
     * TODO: replace urls with API data
     */
	const urls: string[] = ["https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/"];
	// const navigate = useNavigate();

	return(
		<>
			{/* <IconButton aria-label={"Back"} icon={<ChevronLeftIcon />} onClick={() => navigate("/")}>
			</IconButton> */}
			{/* kanskje fjern iconbutton */}
			<InstagramPosts URLs={urls} heading={"Instagram posts from users you are following"}></InstagramPosts>

		</>
	);
};

export default InstagramWatchPage;

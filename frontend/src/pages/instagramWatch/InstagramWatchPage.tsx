import InstagramPosts from "components/InstagramPost";


const InstagramWatchPage = () => {

	/**
     * TODO: replace urls with API data
     */
	const urls: string[] = ["https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/","https://www.instagram.com/p/CjkVLbwK9VI/"];

	return(
		<InstagramPosts URLs={urls} heading={"Instagram posts from users you are following"}></InstagramPosts>
	);
};

export default InstagramWatchPage;

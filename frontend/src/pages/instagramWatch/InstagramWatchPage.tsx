import { getListLocalStorage } from "api/localStorage";
import InstagramPosts from "components/InstagramPost";
import { useEffect, useState } from "react";
import API from "../../api/api";


const InstagramWatchPage = () => {

	const [postURLS, setPostURLS] = useState<string[]>();

	useEffect(() => {
		const userString: string = getListLocalStorage("followedUsers").replace(" ", "");
		const userList: string[] = userString ? userString.split(",") : [];

		API.getBusinessPostURLS(userList).then((postURLS) => {
			setPostURLS(postURLS);
		}).catch(error => {
			console.error("Failed to fetch post urls: %o", error);
		});
	},[]);

	return(
		<>
			{postURLS &&
		<InstagramPosts URLs={postURLS} heading={"Instagram posts from users you are following"}></InstagramPosts>}
		</>
	);
};

export default InstagramWatchPage;

import { Select } from "@chakra-ui/react";
import { getListLocalStorage } from "api/localStorage";
import InstagramPosts from "components/InstagramPost";
import { useEffect, useState } from "react";
import API from "../../api/api";


const InstagramWatchPage = () => {

	const [postURLS, setPostURLS] = useState<string[]>();
	const [sort, setSort] = useState("user");

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSort(event.target.value);

	useEffect(() => {
		const userString: string = getListLocalStorage("followedUsers").replace(" ", "");
		const userList: string[] = userString ? userString.split(",") : [];

		API.getBusinessPostURLS(userList, sort).then((postURLS) => {
			setPostURLS(postURLS);
		}).catch(error => {
			console.error("Failed to fetch post urls: %o", error);
		});
	},[sort]);

	return(
		<>
			<Select w="200px" bg="lightgreen" borderColor='lightgreen' variant='filled' placeholder='Select sorting' value={sort} onChange={handleSelectChange}>
				<option value='likes'>Likes</option>
			</Select>
			{postURLS &&
		<InstagramPosts URLs={postURLS} heading={"Instagram posts from users you are following"}></InstagramPosts>}
		</>
	);
};

export default InstagramWatchPage;

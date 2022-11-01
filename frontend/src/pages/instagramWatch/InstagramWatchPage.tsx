import { HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import { getListLocalStorage, getItemLocalStorage, setItemLocalStorage } from "api/localStorage";
import ToolTip from "components/ToolTip";
import InstagramPosts from "components/InstagramPost";
import { useEffect, useState } from "react";
import API from "../../api/api";

const InstagramWatchPage = () => {

	const [postURLS, setPostURLS] = useState<string[]>();
	const [sort, setSort] = useState(getItemLocalStorage("sort", "user"));
	const [postAmount, setPostAmount] = useState(getItemLocalStorage("postAmount", "5"));

	useEffect(() => {
		const userString: string = getListLocalStorage("followedUsers").replace(" ", "");
		const userList = userString ? userString.split(",") : [];
		handleAPICall(userList);
		setItemLocalStorage(postAmount, "postAmount");
		setItemLocalStorage(sort, "sort");
	},[sort, postAmount]);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSort(event.target.value);
	const handlePostAmountChange = (postAmount: string) => setPostAmount(postAmount);
	const handleAPICall = (userList: string[]) => {
		API.getBusinessPostURLS(userList, sort, postAmount).then((postURLS) => {
			setPostURLS(postURLS);
		}).catch(error => {
			console.error("Failed to fetch post urls: %o", error);
		});
	};

	return(
		<>
			<HStack>
				<ToolTip tooltip="Default sorting of posts is based on user. Change to sorting based on likes or comments"/>
				<Select w="200px" bg="lightgreen" borderColor='lightgreen' variant='filled' placeholder='Select sorting' value={sort} onChange={handleSelectChange}>
					<option value='likes'>Likes</option>
					<option value='comments'>Comments</option>
				</Select>
				<ToolTip tooltip="Amount of posts per user. Only use arrows to change value."/>
				<NumberInput variant="filled" maxW="70px" borderColor='lightgreen' defaultValue={5} min={1} max={20} value={postAmount} onChange={handlePostAmountChange}>
					<NumberInputField bg="lightgreen" borderColor='lightgreen'/>
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</HStack>
			{postURLS &&
		<InstagramPosts URLs={postURLS} heading={"Instagram posts from users you are following"}></InstagramPosts>}
		</>
	);
};

export default InstagramWatchPage;

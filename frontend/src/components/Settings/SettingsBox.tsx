import { Text, Center, VStack, Input, HStack, Button, Box } from "@chakra-ui/react";
import { getListLocalStorage, setLocalStorageList } from "api/localStorage";
import HashtagBox from "./HashtagBox";
import API from "../../api/api";
import {
	AiOutlineSend,
} from "react-icons/ai";
import { useEffect, useState } from "react";

interface SettingsBoxProps {
    title: string,
    storagePath: string,
}
const SettingsBox = ({title, storagePath} : SettingsBoxProps) => {

	const [input, setInput] = useState("");
	const [validUsername, setValidUsername] = useState<boolean|null>(null);
	const [listFromStorage, setListFromStorage] = useState(getListLocalStorage(storagePath).split(",").filter(element => {
		return element !== "";}));

	useEffect(() => {
		if (validUsername === true) {
			const tempList = [...listFromStorage];
			tempList.push(input);
			setListFromStorage(tempList);
			setLocalStorageList(tempList.toString(), storagePath);
		}
		setInput("");
	},[validUsername]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
	
	const handleButtonPress: React.MouseEventHandler = () => {
		if (storagePath === "followedUsers") {
			checkValidUsername(input);
		}
	};

	const checkValidUsername = (userName: string) => {
		API.getBusinessUser(userName).then((response) => {
			if (Object.keys(response)[0] === "error" ) {
				alert(response["error"]["error_user_msg"]);
				setValidUsername(false);
			} else {
				setValidUsername(true);
			}
		}).catch(error => {
			console.error("Failed to fetch valid username: %o", error);
		});
	};

	const handleDeleteItem = (itemName: string) => {
		const tempList = [...listFromStorage];
		const index = tempList.indexOf(itemName);
		tempList.splice(index, 1);
		setListFromStorage(tempList);
		setLocalStorageList(tempList.toString(), storagePath);
	};

	return (
		<VStack borderStyle="solid" borderWidth="2px" borderColor="sleekGrey" borderRadius="10%" m={5} p={5}>
			<Center borderBottom="black">
				<Text marginBottom={"10%"} fontSize={"2xl"}  color="forest">{title}</Text>
			</Center>
			<Box>
				{listFromStorage && listFromStorage.map((word: string, index: number) => (
					<HashtagBox key={index} name={word} deleteCallback={() => handleDeleteItem(word)}></HashtagBox>
				))}
			</Box>
			<HStack maxWidth="300px">
				<Input placeholder='Add new word...' size='sm' value={input} onChange={handleInputChange}/>
				<Button variant='ghost' onClick={handleButtonPress}>
					<AiOutlineSend width="50px"></AiOutlineSend>
				</Button>
			</HStack>
		</VStack>
	);
};

export default SettingsBox;

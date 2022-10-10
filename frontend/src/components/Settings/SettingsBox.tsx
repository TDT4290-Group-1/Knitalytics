import { Text, SimpleGrid, Center, VStack, Input, HStack, Button } from "@chakra-ui/react";
import { getListLocalStorage, setLocalStorageList } from "api/localStorage";
import HashtagBox from "./HashtagBox";
import {
	AiOutlineSend,
} from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

interface SettingsBoxProps {
    title: string,
    storagePath: string,
}
const SettingsBox = ({title, storagePath} : SettingsBoxProps) => {

	const [input, setInput] = useState("");
	const [buttonPress, setButtonPress] = useState(false);
	const [listFromStorage, setListFromStorage] = useState(getListLocalStorage(storagePath).split(","));

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
	//const handleButtonPress = (event: React.MouseEventHandler<HTMLButtonElement, MouseEvent>) => setButtonPress(event.target.checked);
	const handleButtonPress: React.MouseEventHandler = () => {setButtonPress(buttonPress => !buttonPress);};
	const initialRender = useRef(true);

	useEffect(() => {
		console.log("hellooo from useeffect");
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			const tempList = listFromStorage;
			tempList.push(input);
			setListFromStorage(tempList);
			setLocalStorageList(listFromStorage.toString(), storagePath);
		}
	},[buttonPress]);

	console.log("lsit from storage");
	console.log(listFromStorage);

	return (
		<VStack>
			<Center borderBottom="black">
				<Text marginBottom={"10%"} fontSize={"2xl"}  color="forest">{title}</Text>
			</Center>
			<SimpleGrid minChildWidth="100px" spacing={10} w="100%">
				{listFromStorage && listFromStorage.map((word: string, index: number) => (
					<HashtagBox key={index} name={word}></HashtagBox>
				))}
			</SimpleGrid>
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

import { Text, Center, VStack, Input, HStack, Box, IconButton } from "@chakra-ui/react";
import { getListLocalStorage, setItemLocalStorage } from "api/localStorage";
import HashtagBox from "./HashtagBox";

import {
	AiOutlineSend,
} from "react-icons/ai";
import { useState } from "react";
import ToolTip from "components/ToolTip";
import theme from "theme";

interface SettingsBoxProps {
    title: string,
    storagePath: string,
	validateInput: (input: string) => Promise<boolean>,
	tooltip?: string;
}
const SettingsBox = ({title, storagePath, validateInput, tooltip} : SettingsBoxProps) => {

	const [input, setInput] = useState("");
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);
	const [listFromStorage, setListFromStorage] = useState(
		getListLocalStorage(storagePath)
			.split(",")
			.filter(element => element));

	
	const handleButtonPress: React.MouseEventHandler = async () => {

		const inputValid = await validateInput(input);
		if (inputValid) {
			const tempList = [...listFromStorage];
			tempList.push(input);
			setListFromStorage(tempList);
			setItemLocalStorage(tempList.toString(), storagePath);
		}
		setInput("");
	};

	const handleDeleteItem = (itemName: string) => {
		const tempList = [...listFromStorage];
		const index = tempList.indexOf(itemName);
		tempList.splice(index, 1);
		setListFromStorage(tempList);
		setItemLocalStorage(tempList.toString(), storagePath);
	};


	return (
		<VStack padding={"5%"} margin={"5%"}>
			<Center borderBottom="black">
				<HStack paddingBottom={"10%"} >
					{tooltip &&
					<ToolTip
						tooltip={tooltip}/>
					}
					
					<Text fontSize={"2xl"}  color="forest">{title}</Text>
				</HStack>
			</Center>
			
			<Box paddingBottom={"10%"}>
				{listFromStorage && listFromStorage.map((word: string, index: number) => (
					<HashtagBox key={index} name={word} deleteCallback={() => handleDeleteItem(word)}></HashtagBox>
				))}
			</Box>
			<HStack maxWidth="300px" >
				<Input placeholder='Add new word...' size='sm' 
					value={input} 
					onChange={handleInputChange} 
					variant="outline"
					rounded={"lg"}
					borderColor={theme.colors.hovergreen}
				/>
				<IconButton variant='ghost'
					onClick={handleButtonPress}
					icon={<AiOutlineSend width="50px" color={theme.colors.hovergreen}/>} aria-label={"Add"}
				/>
			</HStack>
		</VStack>
	);
};

export default SettingsBox;

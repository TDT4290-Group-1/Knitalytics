import { Center, Text, SimpleGrid } from "@chakra-ui/react";
import SettingsBox from "components/Settings/SettingsBox";
import API from "../../api/api";

const Settings = () => {
	const validateHashtag = async (hashtag: string): Promise<boolean> => {
		try {
			const res = await API.getHashtagId(hashtag);
			const errorMessage = res.error?.error_user_msg;
			if (errorMessage) {
				//Enters if statement if errormessage is "falsy"
				alert(errorMessage);
			}			
			return !errorMessage;
		} catch (error) {
			console.error("Failed to fetch valid username: %o", error);
		}
		return false;
	};
	const validateUsername = async (userName: string): Promise<boolean> => {
		try {
			const res = await API.getBusinessUser(userName);
			const errorMessage = res.error?.error_user_msg;
			if (errorMessage) {
				//Enters if statement if errormessage is "falsy"
				alert(errorMessage);
			}			
			return !errorMessage;
		} catch (error) {
			console.error("Failed to fetch valid username: %o", error);
		}
		return false;
	};
	const validateFilterWord = async (_filterWord: string): Promise<boolean> => {
		//No validation, any input is valid
		return true;
	};
	return (
		<>
			<Center>
				<Text fontSize={"6xl"} marginBottom={"6%"} color="forest">Settings</Text>
			</Center>
			<SimpleGrid minChildWidth='200px' spacing={5}>
				<SettingsBox title="Filtered out words" storagePath="filteredOutWords" validateInput={validateFilterWord}></SettingsBox>
				<SettingsBox title="Followed users" storagePath="followedUsers" validateInput={validateUsername}></SettingsBox>
				<SettingsBox title="Followed hashtags" storagePath="followedHashtags" validateInput={validateHashtag}></SettingsBox>
			</SimpleGrid>
		</>
	);
};

export default Settings;

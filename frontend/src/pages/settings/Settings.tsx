import { Center, SimpleGrid, GridItem, chakra } from "@chakra-ui/react";
import SettingsBox from "components/Settings/SettingsBox";
import theme from "theme";
import API from "../../services/apiService";

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
				<chakra.h1
					textAlign={"center"}
					fontSize={"5xl"}
					paddingTop={"2%"}
					paddingBottom={"7%"}
					fontWeight={"bold"}
					color={"forest"}>
					Settings
				</chakra.h1>
			</Center>
			<SimpleGrid  templateRows='auto'
				minChildWidth='300px'
				h='auto'
				gap={6}
				padding={3}>
				<GridItem  rounded={"2xl"} border={`1px solid ${theme.colors.hovergreen}`} bg={"almostwhite"}>
					<SettingsBox title="Filtered out words"
						storagePath="filteredOutWords"
						validateInput={validateFilterWord}
						tooltip="Filter out hashtags containing these words"
					/>
				</GridItem>
				<GridItem rounded={"2xl"} border={`1px solid ${theme.colors.hovergreen}`} bg={"almostwhite"}>
					<SettingsBox title="Followed users"
						storagePath="followedUsers"
						validateInput={validateUsername}
						tooltip="Administrate usernames you want to follow"
					/>
				</GridItem>
				<GridItem rounded={"2xl"} border={`1px solid ${theme.colors.hovergreen}`} bg={"almostwhite"}>
					<SettingsBox title="Followed hashtags"
						storagePath="followedHashtags"
						validateInput={validateHashtag}
						tooltip="Administrate hashtags you want to follow"
					/>
				</GridItem>
			</SimpleGrid>
		</>
	);
};

export default Settings;

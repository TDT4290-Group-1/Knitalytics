import { Center, Text, SimpleGrid } from "@chakra-ui/react";
import SettingsBox from "components/Settings/SettingsBox";

const Settings = () => {
	return (
		<>
			<Center>
				<Text fontSize={"6xl"} marginBottom={"6%"} color="forest">Settings</Text>
			</Center>
			<SimpleGrid minChildWidth='200px' spacing={5}>
				<SettingsBox title="Filtered out words" storagePath="filteredOutWords"></SettingsBox>
				<SettingsBox title="Followed users" storagePath="followedUsers"></SettingsBox>
				<SettingsBox title="Followed hashtags" storagePath="followedHashtags"></SettingsBox>
			</SimpleGrid>
		</>
	);
};

export default Settings;

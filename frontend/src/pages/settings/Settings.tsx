import { Center, Text, SimpleGrid  } from "@chakra-ui/react";
import SettingsBox from "components/Settings/SettingsBox";

const Settings = () => {
	return (
		<>
			<Center>
				<Text fontSize={"6xl"} marginBottom={"6%"} color="forest">Settings</Text>
			</Center>
			<SimpleGrid minChildWidth='350px' spacingY='50px' spacingX="0px">
				<SettingsBox title="Filtered out words" storagePath="filteredOutWords"></SettingsBox>
			</SimpleGrid>
		</>
	);
};

export default Settings;

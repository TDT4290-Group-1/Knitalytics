import { ChakraProvider } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";

const HomePage = () => {
	return (
		<ChakraProvider>
			<ContentBox
				category="Clothes"
				statName="Growth"
				items={[{ name: "Gucci", value: "50%" }, { name: "Gucci2", value: "50kg" }]}
			/>
		</ChakraProvider>
	);
};

export default HomePage;

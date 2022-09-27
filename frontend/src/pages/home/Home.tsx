import { Heading, Center } from "@chakra-ui/react";
import ContentBox from "components/ContentBox";
import SideBar from "components/SideBar";

const HomePage = () => {
	return (
		<div>
			<SideBar/>
			<Center>
				<Heading>Trending Words</Heading>
			</Center>
			<ContentBox
				category="Word"
				statName="Growth"
				items={[{ name: "American dream", value: "50%", value2: "1023 søk" }, { name: "Irish wool", value: "10%", value2: "543 søk" }]}
			/>
		</div>
	);
};

export default HomePage;

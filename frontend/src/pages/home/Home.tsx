import ContentBox from "components/ContentBox";

const HomePage = () => {
	return (
		<ContentBox
			category="Word"
			statName="Growth"
			items={[{ name: "American dream", value: "50%", value2: "1023 søk" }, { name: "Irish wool", value: "10%", value2: "543 søk" }]}
		/>
	);
};

export default HomePage;

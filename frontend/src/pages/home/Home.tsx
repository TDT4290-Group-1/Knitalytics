import ContentBox from "components/ContentBox";

const HomePage = () => {
	return (
		<ContentBox
			category="Word"
			statName="Growth"
			items={[{ name: "American dream", value: "50%" }, { name: "Irish wool", value: "10%" }]}
		/>
	);
};

export default HomePage;

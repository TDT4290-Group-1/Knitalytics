import ContentBox from "components/ContentBox";

const HomePage = () => {
	return (
		<ContentBox
			category="Clothes"
			statName="Growth"
			items={[{ name: "Gucci", value: "50%" }, { name: "Gucci2", value: "50kg" }]}
		/>
	);
};

export default HomePage;


import renderer from "react-test-renderer";
import FashionBrands from "pages/fashionBrands";

it("renders correctly", () => {
	const tree = renderer
		.create(
			
			<FashionBrands />

		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

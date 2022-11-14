
import renderer from "react-test-renderer";
import Hashtags from "pages/hashtags";

it("renders correctly", () => {
	const tree = renderer
		.create(

			<Hashtags />

		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});


import renderer from "react-test-renderer";
import InstagramUsers from "pages/instagramUsers";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<InstagramUsers />
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

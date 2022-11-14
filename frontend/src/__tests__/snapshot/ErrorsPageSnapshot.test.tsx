
import renderer from "react-test-renderer";

import Error from "pages/error";

it("renders correctly", () => {
	const tree = renderer
		.create(

			<Error />
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

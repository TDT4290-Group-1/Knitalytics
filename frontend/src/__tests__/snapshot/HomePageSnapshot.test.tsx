
import renderer from "react-test-renderer";
import HomePage from "pages/home";
import { BrowserRouter } from "react-router-dom";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

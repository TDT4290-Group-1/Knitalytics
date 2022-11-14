
import renderer from "react-test-renderer";
import GoogleDetailsPage from "pages/googleDetails/";
import { BrowserRouter } from "react-router-dom";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<GoogleDetailsPage />
			</BrowserRouter>

		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

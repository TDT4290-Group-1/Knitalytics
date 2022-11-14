import renderer from "react-test-renderer";
import SettingsPage from "pages/settings";

it("renders correctly", () => {
	const tree = renderer
		.create(
			<SettingsPage />
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

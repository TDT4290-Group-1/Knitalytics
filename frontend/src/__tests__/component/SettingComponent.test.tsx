import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import SettingsBox from "components/settings/SettingsBox";


describe("Testing Settings component", () => {	
	
	beforeEach(() => {
		render(
			<SettingsBox title={""} storagePath={""} validateInput={function (_input: string): Promise<boolean> {
				console.log("new word added");
				return Promise.resolve(true);
			} } />
		);
	});
	


	test("Renders Settings component correctly", () => {
		
		// expect(screen.getByText("knit")).toBeInTheDocument();
		// expect(screen.getByText("strik")).toBeInTheDocument();
		// expect(screen.getByText("insta")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Add new word...")).toBeInTheDocument();
	});

	test("Input field is functional", async () => {
		const inputField = screen.getByPlaceholderText("Add new word...");
		await waitFor(() => {

			inputField.click();
			fireEvent.change(inputField, { target: { value: "test" } });
		});

		expect(inputField).toHaveValue("test");
		// expect(screen.getAllByTestId("hashtag-box").length).toBe(3);





		

	});
}	);

import "@testing-library/jest-dom/extend-expect";

import { render, screen} from "@testing-library/react";
import ToolTip from "components/ToolTip";
import { BrowserRouter } from "react-router-dom";

describe("Testing ToolTip component", () => {	
	
	beforeEach(() => {

		render(
			<BrowserRouter>
				<ToolTip tooltip={"Testing this component"} />
			</BrowserRouter>
		);
	}	);
	


	test("Renders Tooltip", () => {
		expect(screen.getByTestId("tool-tip")).toBeInTheDocument();
	});



}	);

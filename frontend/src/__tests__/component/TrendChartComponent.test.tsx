import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

import { render, screen} from "@testing-library/react";
import { TrendChart } from "components/TrendChart";

describe("Testing TrendChart component", () => {	
	
	beforeEach(() => {

		render(
			<TrendChart />
		);
	}	);
	


	test("Renders TrendChart", () => {
		expect(screen.getByText("Weekley relative popularity the last year")).toBeInTheDocument();


	});



}	);

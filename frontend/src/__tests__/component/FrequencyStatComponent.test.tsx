import "@testing-library/jest-dom/extend-expect";

import { render, screen} from "@testing-library/react";
import { FrequencyStat } from "components/FrequencyStat";


describe("Testing FrequencyStat component", () => {	
	
	


	test("Renders FrequencyStat component correctly", () => {
		render(
			<FrequencyStat details={{word: "test"}}/>
		);
		expect(screen.getByText("Metrics")).toBeInTheDocument();
		expect(screen.getByText("Frequency Growth")).toBeInTheDocument();
		expect(screen.getByText("Search count")).toBeInTheDocument();
	});

	test("Renders FrequencyStat component correctly with no metrics correctly", () => {
		render(
			<FrequencyStat details={{word: "test"}}/>
		);
		expect(screen.getByText("Metrics")).toBeInTheDocument();
		expect(screen.getByText("Frequency Growth")).toBeInTheDocument();
		expect(screen.getByText("Search count")).toBeInTheDocument();
		
		expect(screen.getByText("The search is not on the list of top frequency growths")).toBeInTheDocument();
		expect(screen.getByText("The search is not on the list of top search counts")).toBeInTheDocument();

	});

	test("Renders FrequencyStat component correctly with metrics correctly", () => {

		render(
			<FrequencyStat details={{word: "test", search_count:30, frequency_growth:40}}/>
		);


		expect(screen.getByText("Metrics")).toBeInTheDocument();
		expect(screen.getByText("Frequency Growth")).toBeInTheDocument();
		expect(screen.getByText("Search count")).toBeInTheDocument();
		
		expect(screen.getByText("40%")).toBeInTheDocument();
		expect(screen.getByText("30")).toBeInTheDocument();

	});



}	);

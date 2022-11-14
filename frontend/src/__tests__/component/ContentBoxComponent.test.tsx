import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import ContentBox from "components/ContentBox";
import { TrendingWord } from "models/trendingword";
import { BrowserRouter } from "react-router-dom";

describe("Testing ContentBox component", () => {	
	
	beforeEach(() => {

		render(
			<BrowserRouter>
				<ContentBox items={undefined} setTrendingWords={function (_trendingWords: TrendingWord[] | undefined): void {
					console.log("setTrendingWords function called");
                    
				} } setFilter={function (_error: boolean): void {
					console.log("setFilter function called");

				} } timeframe={""} setTimeframe={function (_timeframe: string): void {
					console.log("setFilter function called");

				} } />
			</BrowserRouter>
		);
	}	);
	

	test("Renders Content box", () => {
		const table = document.getElementById("content-table");
		expect(table).not.toBeNull();
	});

	test("Has the correct header texts",    () => {
		expect(screen.getByText("Word")).toBeInTheDocument();
		expect(screen.getByText("Filter")).toBeInTheDocument();
		if(screen.queryByText("Frequency growth")) expect(screen.getByText("Frequency growth")).toBeInTheDocument();
		else expect(screen.getByText("Search count")).toBeInTheDocument();
	});


	test("Shows loading when no items are passed", () => {
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	test("Filter checkbox is rendered and is clickable", async () => {
		const checkbox = screen.getByLabelText("filter-checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toBeEnabled();
		expect(checkbox).not.toBeChecked();
		await waitFor(() => {

			checkbox.click();
		});
		expect(checkbox).toBeChecked();
	});

	test("Metric selection button switches on click", async () => {
		const metricFrequencyGrowthButton = screen.queryByText("Frequency growth");
		const metricSearchCountButton = screen.queryByText("Search count");
		if (metricFrequencyGrowthButton !== null) {
			expect(metricFrequencyGrowthButton).toBeInTheDocument();
			await waitFor(() => {
				metricFrequencyGrowthButton.click();
			});
			expect(screen.getByText("Search count")).toBeInTheDocument();
		} else if(metricSearchCountButton !== null) {
			expect(metricSearchCountButton).toBeInTheDocument();
			await waitFor(() => {
				metricSearchCountButton.click();
			});
			expect(screen.getByText("Frequency growth")).toBeInTheDocument();
		}
		
	});


}	);

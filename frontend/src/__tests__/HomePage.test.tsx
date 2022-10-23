import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import HomePage from "pages/home/";
import { BrowserRouter } from "react-router-dom";

test("Renders Words link", () => {
	render(
		<BrowserRouter>
			<HomePage />
		</BrowserRouter>
	);
	const linkElement = screen.getAllByText(/loading/i);
	expect(linkElement);
});

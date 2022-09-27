import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import HomePage from "pages/home/";

test("Renders Words link", () => {
	render(<HomePage />);
	const linkElement = screen.getByText(/loading/i);
	expect(linkElement).toBeInTheDocument();
});

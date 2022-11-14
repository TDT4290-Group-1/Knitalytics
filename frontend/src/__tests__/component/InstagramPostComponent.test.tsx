
import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import InstagramPosts from "components/InstagramPost";


import { BrowserRouter } from "react-router-dom";

describe("Testing InstagramPosts component", () => {	
	
	
	test("Renders InstragramPost compoent correctly when no proper url given", () => {
		render(
			<BrowserRouter>
				<InstagramPosts URLs={[]} heading={""}></InstagramPosts>
			</BrowserRouter>
		);
		expect(screen.getByText("Could not find any related posts")).toBeInTheDocument();
	});

	test("Renders InstragramPost compoent correctly when proper url given", () => {
		render(
			<BrowserRouter>
				<InstagramPosts URLs={["https://www.instagram.com/p/CkgUywXLEeC/"]} heading={""}></InstagramPosts>
			</BrowserRouter>
		);
		const errorText = screen.queryByText("Could not find any related posts");
		expect(errorText).not.toBeInTheDocument();


	}  );    

}	);



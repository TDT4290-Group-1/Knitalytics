
import "@testing-library/jest-dom/extend-expect";

import { render, screen} from "@testing-library/react";
import RelatedWords from "components/RelatedWords";


import { BrowserRouter } from "react-router-dom";

describe("Testing SideBar component", () => {	
	

	
	test("Renders InstragramPost compoent correctly when no realted words exists", () => {
		render(
			<BrowserRouter>
				<RelatedWords heading={""} type={""} relatedWords={[]}></RelatedWords>
			</BrowserRouter>
		);
		expect(screen.getByText("Could not find any related hashtags")).toBeInTheDocument();
	});

	test("Renders InstragramPost compoent correctly when realted words exists", () => {
		render(
			<BrowserRouter>
				<RelatedWords heading={"Related words"} type={"instagram"} relatedWords={["test", "hei"]}></RelatedWords>
			</BrowserRouter>
		);
		const errorText = screen.queryByText("Could not find any related hashtags");
		expect(errorText).not.toBeInTheDocument();
		expect( screen.queryByText("test")).toBeInTheDocument();
		expect( screen.queryByText("hei")).toBeInTheDocument();


	}  );    
	test("Renders headers properly", () => {
		render(
			<BrowserRouter>
				<RelatedWords heading={"Related words"} type={"instagram"} relatedWords={["test", "hei"]}></RelatedWords>
			</BrowserRouter>
		);
		expect( screen.queryByText("Related words")).toBeInTheDocument();



	}  );    

}	);



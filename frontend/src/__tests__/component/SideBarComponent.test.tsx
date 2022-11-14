import "@testing-library/jest-dom/extend-expect";

import { render} from "@testing-library/react";
import SimpleSidebar from "components/sidebar/SideBar";


import { BrowserRouter } from "react-router-dom";

describe("Testing RelatedWord component", () => {	
	
	
	beforeEach(() => {

		render(
			<BrowserRouter>
				<SimpleSidebar> </SimpleSidebar>
			</BrowserRouter>
		);
	}	);




	
	
	test("Renders sidebar normal view", () => {
		expect(document.getElementById("side-bar")).toBeInTheDocument();
	});

	test("Sidebar contains correct content", () => {
		const sidebar = document.getElementById("side-bar");
		expect(sidebar?.innerHTML).toContain("Trending words");
		expect(sidebar?.innerHTML).toContain("Followed users");
		expect(sidebar?.innerHTML).toContain("Hashtags");
		expect(sidebar?.innerHTML).toContain("Link");
		expect(sidebar?.innerHTML).toContain("Settings");
	});
	
	test("Renders sidebar with it's content", () => {
		const sidebarTitle = document.getElementById("side-bar");
		expect(sidebarTitle);
		const sidebarContent = document.getElementById("sidebar-content");
		expect(sidebarContent);
	});





}	);

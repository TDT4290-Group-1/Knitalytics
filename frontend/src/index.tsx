import React from "react";

import PackagesProviders from "config/PackagesProviders";

import Router from "./router/Router";
import SidebarWithHeader from "../src/components/Sb";


import { root } from "config/ReactConstants";
import SelectedWordContextProvider from "context/selectedWordProvider";

root.render(
	<React.StrictMode>

		<PackagesProviders>
			<SidebarWithHeader>
				<SelectedWordContextProvider>
					<Router />
				</SelectedWordContextProvider>
			</SidebarWithHeader>
		</PackagesProviders>
	</React.StrictMode>
);

import React from "react";

import PackagesProviders from "config/PackagesProviders";

import Router from "./router/Router";
import SidebarWithHeader from "../src/components/Sb";


import { root } from "config/ReactConstants";

root.render(
	<React.StrictMode>
		<PackagesProviders>
			<SidebarWithHeader>
				<Router />
			</SidebarWithHeader>
		</PackagesProviders>
	</React.StrictMode>
);

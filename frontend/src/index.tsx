import React from "react";

import PackagesProviders from "config/PackagesProviders";

import Router from "./router/Router";

import { root } from "config/ReactConstants";
import { ChakraProvider } from "@chakra-ui/react";

root.render(
	<React.StrictMode>
		<ChakraProvider>
			<PackagesProviders>
				<Router />
			</PackagesProviders>
		</ChakraProvider>
	</React.StrictMode>
);

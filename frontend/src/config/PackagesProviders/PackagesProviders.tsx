import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../../theme";

interface Props {
	children: JSX.Element | JSX.Element[];
}

const PackagesProviders: React.FC<Props> = ({ children }: Props) => {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				{children}
			</ChakraProvider>
		</BrowserRouter>
	);
};

export default PackagesProviders;

import { extendTheme } from "@chakra-ui/react";
  
const theme = extendTheme({
	colors: {
		feather: "#77C9D4",
		marine: "#57BC90",
		forest: "#015249",
		sleekgrey:"#A5A5AF",
	},
	fonts: {
		heading: "'Nunito', 'sans-serif'",
		body: "'Nunito', 'sans-serif'",
	}
},
);

export default theme;
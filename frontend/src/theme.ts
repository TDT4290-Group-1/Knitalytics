import { extendTheme } from "@chakra-ui/react";
import "@fontsource/playfair-display";
  
const theme = extendTheme(
	{
		colors: {
			mediumGrey:"#D9D9D9",
		},
		fonts: {
			heading: "'Playfair Display'",
			body: "'Playfair Display'",
		}
	},
);

export default theme;

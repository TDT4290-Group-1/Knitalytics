import {
	IconButton,
	Flex,
	useColorModeValue,
	Text,
	FlexProps,
} from "@chakra-ui/react";
import {
	FiMenu,
} from "react-icons/fi";

interface MobileProps extends FlexProps {
    onOpen: () => void;
  }
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("forest", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent="flex-start"
			{...rest}>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open-menu"
				icon={<FiMenu color="white" />}
			/>
  
			<Text fontSize="2xl" ml="8" fontWeight="bold" color={"white"}>
          Knitalytics
			</Text>
		</Flex>
	);
};

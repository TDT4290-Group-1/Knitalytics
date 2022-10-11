import {
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	Text,
	BoxProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiCloset, BiGroup, BiBookmark, BiSortZA } from "react-icons/bi";
import {
	FiSettings,
} from "react-icons/fi";
import {NavItem} from "../components/NavItem";



interface SidebarProps extends BoxProps {
    onClose: () => void;
  }

  interface LinkItemProps {
    name: string;
    icon: IconType;
  }
const LinkItems: Array<LinkItemProps> = [
	{ name: "Trending words", icon: BiSortZA },
	{ name: "Fashion trends", icon: BiCloset },
	{ name: "Trending users", icon: BiGroup },
	{ name: "Watch list", icon: BiBookmark },
	{ name: "Settings", icon: FiSettings },
];
  
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			bg={useColorModeValue("forest", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold" color={"white"}>
            Knitalytics
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} color={"white"}/>
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} color={"white"}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

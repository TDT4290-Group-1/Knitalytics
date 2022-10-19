import {
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	Text,
	BoxProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiGroup, BiBookmark, BiSortZA, BiHash } from "react-icons/bi";
import {
	FiSettings,
} from "react-icons/fi";
import {NavItem} from "./NavItem";



interface SidebarProps extends BoxProps {
    onClose: () => void;
  }

  interface LinkItemProps {
    name: string;
    icon: IconType;
	path: string;
  }
const LinkItems: Array<LinkItemProps> = [
	{ name: "Trending words", icon: BiSortZA, path: "/" },
	{ name: "Trending users", icon: BiGroup, path: "/" },
	{ name: "Watch list", icon: BiBookmark, path: "/InstagramPosts" },
	{ name: "Hashtags", icon: BiHash, path: "/Hashtags" },
	{ name: "Settings", icon: FiSettings, path: "/settings" },
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
				<NavItem key={link.name} icon={link.icon} color={"white"} path={link.path}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

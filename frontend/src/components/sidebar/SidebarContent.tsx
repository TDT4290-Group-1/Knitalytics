import {
	Box,
	CloseButton,
	Flex,
	useColorModeValue,
	Text,
	BoxProps,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiGroup, BiSortZA, BiHash, BiLock } from "react-icons/bi";
import {
	FiSettings, FiLink
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
	{ name: "Followed users", icon: BiGroup, path: "/InstagramPosts" },
	{ name: "Hashtags", icon: BiHash, path: "/Hashtags" },
	{ name: "Links", icon: FiLink, path: "/FashionBrands" },
	{ name: "Settings", icon: FiSettings, path: "/settings" },
	{ name: "Login", icon: BiLock, path: "/login" },
];
  
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box id="sidebar-content"
			bg={useColorModeValue("forest", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex id = "burger-menu" h="20" alignItems="center" mx="8" justifyContent="space-between">
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

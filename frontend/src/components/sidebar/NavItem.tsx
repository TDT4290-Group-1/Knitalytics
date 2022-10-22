import { Flex, FlexProps, Link, Icon } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";



interface NavItemProps extends FlexProps {
    icon: IconType;
	path: string;
    children: ReactText;
  }
export const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
	return (
		<Link href={path} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "teal",
					color: "white",
				}}
				{...rest}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

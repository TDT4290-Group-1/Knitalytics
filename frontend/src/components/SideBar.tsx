import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	IconButton,
	Button,
	VStack,
	DrawerFooter,
	InputGroup,
	Input,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon, SearchIcon } from "@chakra-ui/icons";
import { BiCloset, BiGroup, BiBookmark, BiSortZA } from "react-icons/bi";


export default function SideBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const dummyOnclick = () => { 
		// TODO: replace with inline clickons with navigate
		console.log("clicked");
	};

	const search = () => { 
		// TODO: implement search-functionality
		console.log("searched");
	};
  
	return (
		<>
			<IconButton aria-label='menu' icon={<HamburgerIcon />} onClick={onOpen} colorScheme="teal"/>

			<Drawer
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				
			>
				<DrawerOverlay/>
				<DrawerContent bgColor={"teal"}>
					<DrawerCloseButton color={"white"} variant={"secondary"}/>
					<DrawerHeader borderBottomWidth='0px' color={"white"} fontSize={"3xl"}>
				Knitalytics
					</DrawerHeader>
  
					<DrawerBody>
						<VStack marginTop={"25%"} align="stretch" spacing={7} placeItems="flex-start">

							<Button color='white' variant='link'leftIcon={<BiSortZA/>} onClick={dummyOnclick}>
							Trending words
							</Button>
							<Button color='white' variant='link' leftIcon={<BiCloset/>} onClick={dummyOnclick}>
							Fashion trends
							</Button>
							<Button color='white' variant='link' leftIcon={<BiGroup/>} onClick={dummyOnclick}>
							Trending users
							</Button>
							<Button color='white' variant='link'leftIcon={<BiBookmark/>} onClick={dummyOnclick}>
							Watch list
							</Button>
						</VStack>
						
						<VStack marginTop={"80%"}>
							<InputGroup size='md'>
								<Input
									pr='4.5rem'
									placeholder='Søk...'
									background={"white"}
								/>
								<IconButton icon={<SearchIcon />} aria-label={"Søk"} marginLeft={"2%"} onClick={search}/>
							</InputGroup>
						</VStack>

					</DrawerBody>
					<DrawerFooter placeContent={"flex-start"}>
						<Button color='white' variant='link'leftIcon={<SettingsIcon/>} onClick={dummyOnclick}>
							Innstillinger
						</Button>
					</DrawerFooter>

				</DrawerContent>
			</Drawer>
		</>
	);
}

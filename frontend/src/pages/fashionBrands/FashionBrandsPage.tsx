import AddLink from "components/Links/AddLink";
import LinkList from "components/Links/LinkList";
import { Heading, VStack } from "@chakra-ui/react";
import {useState, useEffect} from "react";

interface Link{
    id: string;
	text: string;
	url: string;
}

const FashionBrandsPage = () => {

	let stored_links = "[]";

	if(localStorage.getItem("links") !== "undefined"){
		stored_links = localStorage.getItem("links") as string;
	}

	const [links, setLinks] = useState(() => JSON.parse(stored_links));

	useEffect(() => {
		localStorage.setItem("links", JSON.stringify(links));
	}, [links]);

	function addLink(link: Link) {
		setLinks([...links, link]);
	}

	function deleteLink(id: string) {
		const newLinks = links.filter((link: Link) => {
			return link.id !== id;
		});
		setLinks(newLinks);
	}

	return(
		<>
			<VStack p={4}>
				<Heading>Links to websites</Heading>
				<LinkList links={links} deleteLink={deleteLink}/>
				<AddLink addLink={addLink}/>
			</VStack>
		</>
	);
};

export default FashionBrandsPage;

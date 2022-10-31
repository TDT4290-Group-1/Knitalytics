import AddLink from "components/Links/AddLink";
import LinkList from "components/Links/LinkList";
import { Heading, VStack } from "@chakra-ui/react";
import { getListLocalStorage, getItemLocalStorage, setItemLocalStorage } from "api/localStorage";
import {useState, useEffect} from "react";
import { toUnicode } from "punycode";

const FashionBrandsPage = () => {
	const initialLinks = [{id: 1, body: "gucci.com"}, {id: 2, body: "holzweileroslo.com"}];

	let stored_links = "[]";

	if(localStorage.getItem("links") !== "undefined"){
		// item not null code
		stored_links = localStorage.getItem("links") as string;
	}

	const [links, setLinks] = useState(() => JSON.parse(stored_links));

	useEffect(() => {
		localStorage.setItem("links", JSON.stringify(links));
	}, [links]);

	function addLink(link: { id: number; body: string; }) {
		setLinks([...links, link]);
	}

	function deleteLink(id: number) {
		const newLinks = links.filter(link => {
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

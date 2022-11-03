import AddLink, {Link} from "components/Links/AddLink";
import LinkList from "components/Links/LinkList";
import { Heading, VStack, Text } from "@chakra-ui/react";
import {useState, useEffect} from "react";

const FashionBrandsPage = () => {

	const [links, setLinks] = useState(() => JSON.parse(localStorage.getItem("links") as string) || []);

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
				{
					links.length !== 0 ?
						<LinkList links={links} deleteLink={deleteLink}/> :
						<Text>No links added</Text>
				}
				<AddLink addLink={addLink}/>
			</VStack>
		</>
	);
};

export default FashionBrandsPage;

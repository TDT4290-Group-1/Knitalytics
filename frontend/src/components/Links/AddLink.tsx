import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import {useState} from "react";
import {nanoid} from "nanoid";

interface Link {
    id: string;
	text: string;
	url: string;
}

function handleUrl(url: string) {
	let newUrl = url;
	if (url.includes("https://")) {
		newUrl = newUrl.replace("https://", "");
	} else if (url.includes("http://")) {
		newUrl = newUrl.replace("http://", "");
	}
	if (url.includes("www.")) {
		newUrl = newUrl.replace("www.", "");
	}
	if (url.length > 30) {
		newUrl = newUrl.substring(0, 30) + "...";
	}
	return newUrl;
}

function AddLink(props: {addLink: (link: Link) => void}) {

	const warning = useToast();

	async function handleSubmit(e: { preventDefault: () => void; }) {
		e.preventDefault();

		//TODO: Check if URL exists
		if (content.length < 4) {
			warning({
				title: "Hyperlink does not exist",
				status: "error",
				duration: 1000,
				isClosable: true,
			});
			setContent("");
			return;
		}

		const link: Link = {
			id: nanoid(),
			text: handleUrl(content),
			url: content,
		};

		props.addLink(link);
		setContent("");
	}

	const [content, setContent] = useState("");

	return (
		<form onSubmit={handleSubmit}>
			<HStack mt="8">
				<Input variant="filled" value={content} onChange={(e) => setContent(e.target.value)}/>
				<Button type="submit" px="8" >Add link</Button>
			</HStack>
		</form>
	);
}

export default AddLink;

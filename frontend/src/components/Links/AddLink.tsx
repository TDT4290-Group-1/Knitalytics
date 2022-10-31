import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import {useState} from "react";
import {nanoid} from "nanoid";

function AddLink({ addLink }) {

	const warning = useToast();

	function handleSubmit(e: { preventDefault: () => void; }) {
		e.preventDefault();

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

		const link = {
			id: nanoid(),
			body: content,
		};

		addLink(link);
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

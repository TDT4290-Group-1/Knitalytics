import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
	Text,
	IconButton,
	Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const ContextPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<IconButton aria-label={"Back"} icon={<ChevronLeftIcon />} onClick={()=>navigate("/")}>
			</IconButton>
			<Center>
				<Text>Context page</Text>
			</Center></>
	);
};

export default ContextPage;

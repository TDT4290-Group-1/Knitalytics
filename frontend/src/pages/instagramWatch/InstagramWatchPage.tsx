import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
	IconButton,
	Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const InstagramWatchPage = () => {


	const navigate = useNavigate();

	return(
		<><IconButton aria-label={"Back"} icon={<ChevronLeftIcon />} onClick={() => navigate("/")}>
		</IconButton><Text>insta page</Text></>
	);
};

export default InstagramWatchPage;

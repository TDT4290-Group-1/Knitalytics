import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

interface TooltipProps{
    tooltip: string;
}

const ToolTip = ({ tooltip } : TooltipProps) => {
	return (<Tooltip label={tooltip}
		openDelay={500}
		color={"forest"}
		bg={"lighthovergreen"}
		border={"1px solid teal"}
		borderRadius={"lg"}
		placement='auto'>
		<InfoOutlineIcon color={"forest"}/>					
	</Tooltip>);
};
export default ToolTip;

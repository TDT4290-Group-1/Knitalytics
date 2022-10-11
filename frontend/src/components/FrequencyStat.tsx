import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,

} from "@chakra-ui/react";
import theme from "../theme";

/**
 * DONE: set up first stat component
 * TODO: take props to display actual data 
 */


export const FrequencyStat= () => {
	
    
	return (


		<StatGroup backgroundColor={"itembackdrop"} border={`1px solid ${theme.colors.sleekgrey}`} borderRadius={5} >
			<Stat margin={"20px"}>

				<StatLabel>Growth</StatLabel>
				<StatNumber>345,670</StatNumber>


				<StatHelpText>
					<StatArrow type='increase' />
                    23.36%
				</StatHelpText>
			</Stat>

			<Stat margin={"20px"} textAlign={"right"}>
				<StatLabel>Search count</StatLabel>
				<StatNumber>45</StatNumber>
				<StatHelpText>
					<StatArrow type='decrease' />
                    9.05%
				</StatHelpText>
			</Stat>
		</StatGroup>



	);
};



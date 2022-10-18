import {
	chakra, HStack, Icon, VStack,
} from "@chakra-ui/react";
import { TrendingWord } from "../../models/trendingword";
import { BiTrendingUp, BiAbacus } from "react-icons/bi";

interface Props {
	details: TrendingWord;
}

export const FrequencyStat= ({details}:Props) => {
	
	function getFrequency() {
		if (details.frequency_growth){
			return (
				<>
					<chakra.h1
						textAlign={"center"}
						fontSize={"2xl"}
						py={0}
						color={"forest"}
					>
					Frequency Growth
					</chakra.h1>
					<HStack paddingBottom={10}>
						<Icon as={BiTrendingUp} color={"forest"} boxSize={7} alignItems="start"></Icon>

						<chakra.h1
							textAlign={"center"}
							fontSize={"lg"}
							color={"forest"}>
							{details.frequency_growth}%
						</chakra.h1>

					</HStack>
				</>
			);
		}
		return (
			<chakra.h1
				textAlign={"center"}
				fontSize={"sm"}
				py={5}
				color={"forest"}>
			The search is not on the list of top frequency growths
			</chakra.h1>);
	}

	function getSearchCount() {
		if (details.search_count){
			return (
				<>
					<chakra.h1
						textAlign={"center"}
						fontSize={"2xl"}
						py={0}
						color={"forest"}
					>
					Search count
					</chakra.h1>
					<HStack>
						<Icon as={BiAbacus} color={"forest"} boxSize={5}></Icon>
						<chakra.h1
							textAlign={"center"}
							fontSize={"lg"}
							paddingBottom={10}
							color={"lighthovergreen"}>
							{details.search_count}%
						</chakra.h1>

					</HStack>
				</>
			);
		}
		return (
			<chakra.h1
				textAlign={"center"}
				fontSize={"sm"}
				py={0}
				color={"forest"}>
			The search is not on the list of top search counts
			</chakra.h1>);
	}
    
	return (

		<VStack >
			<chakra.h1
				textAlign={"center"}
				fontSize={"4xl"}
				py={10}
				fontWeight={"bold"}
				color={"forest"}>
				Metrics
			</chakra.h1>
			{getFrequency()}
			{getSearchCount()}

		</VStack>

	);
};



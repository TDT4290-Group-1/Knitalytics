
import { useEffect, useState } from "react";
import { TrendingWord } from "../../models/trendingword";
import { SelectedWordContext } from "./selectedWordContext";

interface wordProp {
  children: React.ReactNode;
}

export default function SelectedWordContextProvider({ children }: wordProp) {
	const [trendingWord, setTrendingWord] = useState<TrendingWord>({word:""});


	console.log("WOrd", trendingWord);
    
	useEffect(() => {
		console.log(trendingWord);
	}, [trendingWord]);

	return <SelectedWordContext.Provider value={{trendingWord, setTrendingWord}}>{children}</SelectedWordContext.Provider>;
}

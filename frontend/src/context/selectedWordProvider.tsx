
import { useEffect, useState } from "react";
import { SelectedWordContext } from "./selectedWordContext";

interface wordProp {
  children: React.ReactNode;
}

export default function SelectedWordContextProvider({ children }: wordProp) {
	const [word, setWord] = useState<string>("");


	console.log("WOrd", word);
    
	useEffect(() => {
		console.log(word);
	}, [word]);

	return <SelectedWordContext.Provider value={{word, setWord}}>{children}</SelectedWordContext.Provider>;
}

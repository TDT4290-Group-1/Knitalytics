
export const getListLocalStorage = (path: string) => {
	// retrieve it (Or create a blank array if there isn't any info saved yet),
	let words = localStorage.getItem(path) || "";
	if (path === "filteredOutWords" &&  words === "") {
		words = "knit, strik, insta, Knit, Insta, Strik";
		setLocalStorageList(words, path);
	}
	return words;
};
    
export const setLocalStorageList = (words: string, path: string) => {
	localStorage.setItem(path, words);
};

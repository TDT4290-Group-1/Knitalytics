
export const getListLocalStorage = (path: string) => {
	// retrieve it (Or create a blank array if there isn't any info saved yet),
	let words = localStorage.getItem(path) || "";
	if (path === "filteredOutWords" &&  words === "") {
		words = "knit, strik, insta";
		setItemLocalStorage(words, path);
	}
	return words;
};

export const getItemLocalStorage = (path: string, defaultValue: string):string => {
	const item =  localStorage.getItem(path) || "";
	if (item === "") {
		setItemLocalStorage(defaultValue, path);
	}
	return item;
};
    
export const setItemLocalStorage = (item: string, path: string) => {
	localStorage.setItem(path, item);
};

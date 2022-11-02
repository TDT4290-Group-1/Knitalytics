
export const getListLocalStorage = (path: string, defaultValue?: string) => {
	// retrieve it (Or create a blank array if there isn't any info saved yet),
	let listItems = localStorage.getItem(path) || "";
	if (listItems === "" && defaultValue) {
		listItems = defaultValue;
		setItemLocalStorage(defaultValue, path);
	}
	return listItems;
};

export const getItemLocalStorage = (path: string, defaultValue?: string):string => {
	let item =  localStorage.getItem(path) || "";
	if (item === "" && defaultValue) {
		item = defaultValue;
		setItemLocalStorage(defaultValue, path);
	}
	return item;
};
    
export const setItemLocalStorage = (item: string, path: string) => {
	localStorage.setItem(path, item);
};


/**
 * @param path the path to the local storage object
 * @param defaultValue if the object does not exist in local storage, this value will be set at the path
 * @returns a string of items in the format "word1, word2, word3"
 */
export const getListLocalStorage = (path: string, defaultValue?: string) => {
	// retrieve it (Or create a blank array if there isn't any info saved yet),
	let listItems = localStorage.getItem(path) || "";
	if (listItems === "" && defaultValue) {
		listItems = defaultValue;
		setItemLocalStorage(path, defaultValue);
	}
	return listItems;
};

/**
 * @param path the path to the local storage object
 * @param defaultValue if the object does not exist in local storage, this value will be set at the 'path'
 * @returns a string of the item located at 'path' in local storage
 */
export const getItemLocalStorage = (path: string, defaultValue?: string):string => {
	let item =  localStorage.getItem(path) || "";
	if (item === "" && defaultValue) {
		item = defaultValue;
		setItemLocalStorage(path, defaultValue);
	}
	return item;
};
  
/**
 * @param path the path to the local storage object
 * @param item the item to be put in 'path' in local storage
 */
export const setItemLocalStorage = (path: string, item: string) => {
	localStorage.setItem(path, item);
};

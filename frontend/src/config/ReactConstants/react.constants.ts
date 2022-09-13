import { createRoot } from "react-dom/client";

const app = document.getElementById("root");

//If "root" is  undefined | null
if (!app) {
	throw new Error("Root is not defined");
}

const root = createRoot(app);

export { root };

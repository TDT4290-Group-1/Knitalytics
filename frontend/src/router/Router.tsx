import { Routes, Route } from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";
import Context from "pages/context";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/context" element={<Context/>}/>
			{/* TODO fix path for context med params */}
		</Routes>
	);
};

export default Router;

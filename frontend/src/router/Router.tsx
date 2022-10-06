import { Routes, Route } from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";
import InstagramContext from "pages/context";
import GoogleContextPage from "pages/context/GoogleContextPage";
import Settings from "pages/settings";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/InstagramContext" element={<InstagramContext/>}/>
			<Route path="/GoogleContext" element={<GoogleContextPage/>}/>
			{/* TODO fix path for context med params */}
		</Routes>
	);
};

export default Router;

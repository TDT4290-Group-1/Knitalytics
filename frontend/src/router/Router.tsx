import { Routes, Route } from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";
import InstagramContext from "pages/context";
import GoogleContextPage from "pages/context/GoogleContextPage";
import InstagramWatchPage from "pages/instagramWatch";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/InstagramContext" element={<InstagramContext/>}/>
			<Route path="/GoogleContext" element={<GoogleContextPage/>}/>
			<Route path="/InstagramPosts" element={<InstagramWatchPage/>}/>
		</Routes>
	);
};

export default Router;

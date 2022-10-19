import { Routes, Route } from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";
import GoogleDetailsPage from "pages/detailsPage/GoogleDetailsPage";
import InstagramWatchPage from "pages/instagramWatch";
import Settings from "pages/settings";
import HashtagsPage from "pages/hashtags/HashtagsPage";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/GoogleDetails" element={<GoogleDetailsPage/>}/>
			<Route path="/InstagramPosts" element={<InstagramWatchPage/>}/>
			<Route path="/Hashtags" element={<HashtagsPage/>}/>
			{/* TODO fix path for context med params */}
		</Routes>
	);
};

export default Router;

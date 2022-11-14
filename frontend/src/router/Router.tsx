import { Routes, Route } from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";
import GoogleDetailsPage from "pages/googleDetails/GoogleDetailsPage";
import InstagramUsersPage from "pages/instagramUsers";
import SettingsPage from "pages/settings";
import HashtagsPage from "pages/hashtags/HashtagsPage";
import FashionBrandsPage from "pages/fashionBrands/FashionBrandsPage";



const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/settings" element={<SettingsPage />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/GoogleDetails" element={<GoogleDetailsPage/>}/>
			<Route path="/InstagramPosts" element={<InstagramUsersPage/>}/>
			<Route path="/Hashtags" element={<HashtagsPage/>}/>
			<Route path="/FashionBrands" element={<FashionBrandsPage/>}/>
		</Routes>
	);
};

export default Router;

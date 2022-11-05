import { Routes, Route } from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";
import GoogleDetailsPage from "pages/googleDetails/GoogleDetailsPage";
import InstagramUsersPage from "pages/instagramUsers";
import Settings from "pages/settings";
import HashtagsPage from "pages/hashtags/HashtagsPage";
import FashionBrandsPage from "pages/fashionBrands/FashionBrandsPage";
import Login from "pages/login";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/GoogleDetails" element={<GoogleDetailsPage/>}/>
			<Route path="/InstagramPosts" element={<InstagramUsersPage/>}/>
			<Route path="/Hashtags" element={<HashtagsPage/>}/>
			<Route path="/FashionBrands" element={<FashionBrandsPage/>}/>
		</Routes>
	);
};

export default Router;

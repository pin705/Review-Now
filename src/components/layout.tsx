import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import { Navigation } from "./navigation";

// Pages
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import ShopProfilePage from "../pages/ShopProfilePage";
import ReviewPage from "../pages/ReviewPage";
import RecentReviewsPage from "../pages/RecentReviewsPage";
import ProfilePage from "../pages/ProfilePage";
import AddShopPage from "../pages/AddShopPage";
import ReviewHistoryPage from "../pages/ReviewHistoryPage";
import PersonalInfoPage from "../pages/PersonalInfoPage";
import UserGuidePage from "../pages/UserGuidePage";
import TermsAndPrivacyPage from "../pages/TermsAndPrivacyPage";
import AdminPage from "../pages/AdminPage";

if (import.meta.env.DEV) {
  document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");
} else if (getSystemInfo().platform === "android") {
  const statusBarHeight =
    window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  return (
     <Box flex flexDirection="column" className="h-screen">
      <Box className="flex-1 flex flex-col overflow-hidden">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recent" element={<RecentReviewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-shop" element={<AddShopPage />} />
          <Route path="/shop/:shopId" element={<ShopProfilePage />} />
          <Route path="/review/:shopId" element={<ReviewPage />} />
          <Route path="/review-history" element={<ReviewHistoryPage />} />
          <Route path="/personal-info" element={<PersonalInfoPage />} />
          <Route path="/user-guide" element={<UserGuidePage />} />
          <Route path="/terms-privacy" element={<TermsAndPrivacyPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};

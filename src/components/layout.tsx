import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import { Navigation } from "./navigation";

// Pages
import SearchPage from "../pages/SearchPage";
import ShopProfilePage from "../pages/ShopProfilePage";
import ReviewPage from "../pages/ReviewPage";
import RecentReviewsPage from "../pages/RecentReviewsPage";

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
          <Route path="/" element={<SearchPage />} />
          <Route path="/recent" element={<RecentReviewsPage />} />
          <Route path="/shop/:shopId" element={<ShopProfilePage />} />
          <Route path="/review/:shopId" element={<ReviewPage />} />
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};

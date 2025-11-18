import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
// import { Navigation } from "./navigation";
import ExpenseHomePage from "pages/expense-home";
import AddTransactionPage from "pages/add-transaction";
import HistoryPage from "pages/history";
import ReportsPage from "pages/reports";
import SettingsPage from "pages/settings";
import BudgetPage from "pages/budget";
import ManageWalletsPage from "pages/manage-wallets";
import ManageCategoriesPage from "pages/manage-categories";
import GuidePage from "pages/guide";
import { getSystemInfo } from "zmp-sdk";
// import { ScrollRestoration } from "./scroll-restoration";

// Pages
import SearchPage from "../pages/SearchPage";
import ShopProfilePage from "../pages/ShopProfilePage";
import ReviewPage from "../pages/ReviewPage";

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
      {/* <ScrollRestoration /> */}
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
           <Route path="/" element={<SearchPage />} />
                        <Route path="/shop/:shopId" element={<ShopProfilePage />} />
                        <Route path="/review/:shopId" element={<ReviewPage />} />
        </Routes>
      </Box>
      {/* <Navigation /> */}
    </Box>
  );
};

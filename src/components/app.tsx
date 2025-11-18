import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";

// Pages
import SearchPage from "../pages/SearchPage";
import ShopProfilePage from "../pages/ShopProfilePage";
import ReviewPage from "../pages/ReviewPage";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/shop/:shopId" element={<ShopProfilePage />} />
              <Route path="/review/:shopId" element={<ReviewPage />} />
            </Routes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;

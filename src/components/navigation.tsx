import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, Icon } from "zmp-ui";

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on detail pages
  const hideNav = location.pathname.startsWith("/shop") || 
                  location.pathname.startsWith("/review/");

  if (hideNav) {
    return null;
  }

  // ZaUI Coffee Style - 4 Tabs Simple
  const tabs = {
    "/": {
      label: "Trang chủ",
      icon: <Icon icon="zi-home" />,
    },
    "/search": {
      label: "Tìm kiếm",
      icon: <Icon icon="zi-search" />,
    },
    "/recent": {
      label: "Đánh giá",
      icon: <Icon icon="zi-star" />,
    },
    "/profile": {
      label: "Cá nhân",
      icon: <Icon icon="zi-user" />,
    },
  };

  return (
    <BottomNavigation
      fixed
      activeKey={location.pathname}
      onChange={(key) => navigate(key)}
    >
      {Object.keys(tabs).map((path) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
        />
      ))}
    </BottomNavigation>
  );
};

import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation, Icon } from "zmp-ui";

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on detail pages
  const hideNav = location.pathname.startsWith("/shop") || 
                  location.pathname.startsWith("/review/") ||
                  location.pathname.startsWith("/review-history") ||
                  location.pathname.startsWith("/personal-info") ||
                  location.pathname.startsWith("/user-guide") ||
                  location.pathname.startsWith("/terms-privacy");

  if (hideNav) {
    return null;
  }

  // Tabs with centered Add Shop action
  const tabs: Array<{ path: string; label: string; icon: React.ReactNode }> = [
    { path: "/", label: "Trang chủ", icon: <Icon icon="zi-home" /> },
    { path: "/search", label: "Tìm kiếm", icon: <Icon icon="zi-search" /> },
    {
      path: "/add-shop",
      label: "Thêm shop",
      icon: <Icon icon="zi-plus-circle-solid" />,
    },
    { path: "/recent", label: "Đánh giá", icon: <Icon icon="zi-star" /> },
    { path: "/profile", label: "Cá nhân", icon: <Icon icon="zi-user" /> },
  ];

  return (
    <BottomNavigation fixed activeKey={location.pathname} onChange={(key) => navigate(key)}>
      {tabs.map((t) => (
        <BottomNavigation.Item key={t.path} label={t.label} icon={t.icon} />
      ))}
    </BottomNavigation>
  );
};

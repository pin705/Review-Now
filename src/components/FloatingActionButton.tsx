import React, { FC } from "react";
import { Button, Icon } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";

export const FloatingActionButton: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on detail pages and review page
  const hideButton = location.pathname.startsWith("/shop") || 
                     location.pathname.startsWith("/review") ||
                     location.pathname.startsWith("/add-shop");

  if (hideButton) {
    return null;
  }

  const handleClick = () => {
    navigate("/add-shop");
  };

  return (
    <div 
      style={{
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
      }}
    >
      <Button
        onClick={handleClick}
        size="large"
        icon={<Icon icon="zi-plus-circle-solid" size={24} />}
        className="shadow-lg"
        style={{
          backgroundColor: "#eab308",
          color: "white",
          borderRadius: "999px",
          padding: "12px 24px",
          fontWeight: "600",
          border: "none",
          boxShadow: "0 4px 12px rgba(234, 179, 8, 0.4)",
        }}
      >
        Thêm đánh giá
      </Button>
    </div>
  );
};

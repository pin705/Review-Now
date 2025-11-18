import React, { FC, Suspense, useEffect, useState } from "react";
import { Box, Header, Page, Text, Input, Icon, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Section } from "../components/section";
import { Divider } from "../components/divider";
import { shopService } from "../services/shop.service";
import { Shop } from "../types";
import { getPlatformIconName } from "utils/helpers";

// Welcome Header Component
const Welcome: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <Box className="w-10 h-10 bg-[#eab308] rounded-lg border-inset flex items-center justify-center">
              <Icon icon="zi-star-solid" size={24} className="text-white" />
            </Box>
            <Box>
              <Text.Title size="small">Review Now</Text.Title>
              <Text size="xxSmall" className="text-gray">
                Kiểm tra độ uy tín shop
              </Text>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};

// Search Inquiry Component
const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box className="bg-white p-4">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Tìm shop qua SĐT, tên hoặc link..."
      />
    </Box>
  );
};

// Stats Section
const StatsSection: FC = () => {
  const [stats, setStats] = useState({ totalShops: 0, totalReviews: 0, verified: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const allShops = await shopService.getAllShops();
      const totalReviews = allShops.reduce((sum, shop) => sum + shop.totalReviews, 0);
      const verifiedCount = allShops.filter(s => s.verified).length;
      setStats({
        totalShops: allShops.length,
        totalReviews,
        verified: verifiedCount
      });
    };
    loadStats();
  }, []);

  return (
    <Section title="Thống kê">
      <Box className="grid grid-cols-3 gap-4">
        <Box className="text-center p-4 bg-gradient-to-br from-yellow-50 to-white rounded-lg">
          <Text size="xLarge" className="font-bold text-[#eab308]">
            {stats.totalShops}
          </Text>
          <Text size="xxSmall" className="text-gray mt-1">
            Shops
          </Text>
        </Box>
        <Box className="text-center p-4 bg-gradient-to-br from-green-50 to-white rounded-lg">
          <Text size="xLarge" className="font-bold text-green-600">
            {stats.totalReviews}
          </Text>
          <Text size="xxSmall" className="text-gray mt-1">
            Đánh giá
          </Text>
        </Box>
        <Box className="text-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg">
          <Text size="xLarge" className="font-bold text-blue-600">
            {stats.verified}
          </Text>
          <Text size="xxSmall" className="text-gray mt-1">
            Xác thực
          </Text>
        </Box>
      </Box>
    </Section>
  );
};

// Featured Shops Section
const FeaturedShopsContent: FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadShops = async () => {
      const allShops = await shopService.getAllShops();
      const featured = [...allShops]
        .sort((a, b) => b.trustScore - a.trustScore)
        .slice(0, 3);
      setShops(featured);
    };
    loadShops();
  }, []);

  return (
    <Section title="Shop uy tín nhất">
      <Box className="space-y-3">
        {shops.map((shop, index) => (
          <Box
            key={shop.id}
            className="card flex items-center space-x-3"
            onClick={() => navigate(`/shop/${shop.id}`)}
          >
            <Box className="flex-shrink-0 w-12 h-12 bg-[#eab308] rounded-full flex items-center justify-center">
              <Text className="text-white font-bold text-lg">#{index + 1}</Text>
            </Box>
            {/* Shop Thumbnail */}
            {shop.images && shop.images.length > 0 ? (
              <Box className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={shop.images[0]} 
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </Box>
            ) : (
              <Box className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center flex-shrink-0">
                <Icon icon={getPlatformIconName(shop.platform) as any} size={24} className="text-yellow-300" />
              </Box>
            )}
            <Box className="flex-1">
              <Box flex alignItems="center" className="space-x-2">
                <Text.Header className="font-medium">{shop.name}</Text.Header>
                {shop.verified && (
                  <Icon icon="zi-verified" size={16} className="text-[#eab308]" />
                )}
              </Box>
              <Text size="xSmall" className="text-gray">
                {shop.totalReviews} đánh giá
              </Text>
            </Box>
            <Box className="flex-shrink-0">
              <Text size="xLarge" className="font-bold score-high">
                {shop.trustScore}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
};

const FeaturedShops: FC = () => {
  return (
    <Suspense fallback={<Text>Đang tải...</Text>}>
      <FeaturedShopsContent />
    </Suspense>
  );
};

// Quick Actions
const QuickActions: FC = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: "zi-add-story", label: "Đánh giá shop", path: "/search" },
    { icon: "zi-star", label: "Đánh giá gần đây", path: "/recent" },
    { icon: "zi-search", label: "Tìm kiếm", path: "/search" },
    { icon: "zi-help-circle", label: "Hướng dẫn", path: "/user-guide" },
  ];

  return (
    <Section title="Tính năng">
      <Box className="grid grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <Box
            key={i}
            className="flex flex-col items-center space-y-2"
            onClick={() => navigate(action.path)}
          >
            <Box className="w-14 h-14 bg-[#eab308]/10 rounded-full flex items-center justify-center">
              <Icon icon={action.icon} size={28} className="text-[#eab308]" />
            </Box>
            <Text size="xxSmall" className="text-gray text-center">
              {action.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Section>
  );
};

// Main HomePage
const HomePage: React.FC = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto bg-background">
        <Inquiry />
        {/* <Divider size={4} /> */}
        <StatsSection />
        {/* <Divider size={4} /> */}
        <QuickActions />
        {/* <Divider size={4} /> */}
        <FeaturedShops />
      </Box>
    </Page>
  );
};

export default HomePage;

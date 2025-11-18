import React, { FC } from "react";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Section } from "../components/section";

const ProfilePage: FC = () => {
  const navigate = useNavigate();

  return (
    <Page className="bg-background">
      <Header  showBackIcon={false} title="&nbsp;" />
      
      <Box className="page-content-with-header">
        {/* User Info Card */}
        <Box className="mb-4">
          <Box className="bg-[#eab308] text-white rounded-xl p-4 space-y-2">
            <Text.Title className="font-bold text-white">Review Now Member</Text.Title>
            <Text size="xxSmall" className="text-white/90">
              Góp phần xây dựng cộng đồng mua sắm an toàn
            </Text>
          </Box>
        </Box>
        
        {/* Personal Section */}
        <Section title="Cá nhân">
          <Box className="space-y-3">
            <Box 
              flex 
              className="space-x-2 items-center cursor-pointer"
              onClick={() => navigate("/personal-info")}
            >
              <Icon icon="zi-user" />
              <Box className="flex-1">
                <Text size="small" className="font-medium">
                  Thông tin cá nhân
                </Text>
              </Box>
              <Icon icon="zi-chevron-right" />
            </Box>
            
            <Box 
              flex 
              className="space-x-2 items-center cursor-pointer"
              onClick={() => navigate("/review-history")}
            >
              <Icon icon="zi-clock-2" />
              <Box className="flex-1">
                <Text size="small" className="font-medium">
                  Lịch sử đánh giá
                </Text>
              </Box>
              <Icon icon="zi-chevron-right" />
            </Box>
          </Box>
        </Section>
        
        {/* Other Section */}
        <Section title="Khác">
          <Box className="space-y-3">
            <Box 
              flex 
              className="space-x-2 items-center cursor-pointer"
              onClick={() => navigate("/user-guide")}
            >
              <Icon icon="zi-help-circle" />
              <Box className="flex-1">
                <Text size="small" className="font-medium">
                  Hướng dẫn sử dụng
                </Text>
              </Box>
              <Icon icon="zi-chevron-right" />
            </Box>
            
            <Box 
              flex 
              className="space-x-2 items-center cursor-pointer"
              onClick={() => navigate("/terms-privacy")}
            >
              <Icon icon="zi-check-circle" />
              <Box className="flex-1">
                <Text size="small" className="font-medium">
                  Điều khoản & Bảo mật
                </Text>
              </Box>
              <Icon icon="zi-chevron-right" />
            </Box>
          </Box>
        </Section>
      </Box>
    </Page>
  );
};

export default ProfilePage;

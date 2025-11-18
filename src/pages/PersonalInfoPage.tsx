import React, { useState, useEffect } from 'react';
import { Page, Header, Box, Text, Icon, Avatar } from 'zmp-ui';
import { getUserInfo } from 'zmp-sdk/apis';

const PersonalInfoPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      // Get user info from Zalo
      const { userInfo: zaloUserInfo } = await getUserInfo({});
      setUserInfo(zaloUserInfo);
    } catch (error) {
      console.error('Error loading user info:', error);
      // Fallback to mock data for development
      setUserInfo({
        id: 'demo-user-id',
        name: 'Người dùng Zalo',
        avatar: ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="bg-background">
      <Header
        title="Thông tin cá nhân"
        showBackIcon={true}
      />

      <Box className="page-content-with-header">
        {/* User Profile Card */}
        <Box className="card mb-4">
          <Box flex className="flex-col items-center text-center space-y-3">
            <Avatar
              src={userInfo?.avatar || ''}
              size={80}
              className="border-4 border-yellow-500"
            >
              {!userInfo?.avatar && <Icon icon="zi-user" size={40} />}
            </Avatar>
            <Box>
              <Text.Title className="font-bold">
                {userInfo?.name || 'Đang tải...'}
              </Text.Title>
              <Text size="xSmall" className="text-gray-600">
                Review Now Member
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Account Info */}
        <Box className="card mb-4">
          <Text className="font-semibold text-gray-900 mb-3">
            Thông tin tài khoản
          </Text>
          <Box className="space-y-3">
            <Box flex className="items-center space-x-3">
              <Box className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                <Icon icon="zi-user" className="text-yellow-600" />
              </Box>
              <Box className="flex-1">
                <Text size="xSmall" className="text-gray-600">Tên hiển thị</Text>
                <Text size="small" className="font-medium">
                  {userInfo?.name || 'Đang tải...'}
                </Text>
              </Box>
            </Box>

            <Box flex className="items-center space-x-3">
              <Box className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Icon icon="zi-card" className="text-blue-600" />
              </Box>
              <Box className="flex-1">
                <Text size="xSmall" className="text-gray-600">Zalo ID</Text>
                <Text size="small" className="font-medium">
                  {userInfo?.id || 'Đang tải...'}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Privacy Notice */}
        <Box className="card bg-green-50 border-green-200">
          <Box flex className="items-start space-x-3">
            <Icon icon="zi-shield-tick" className="text-green-600 mt-0.5" />
            <Box className="flex-1">
              <Text size="small" className="font-medium text-green-900 mb-1">
                Bảo mật thông tin
              </Text>
              <Text size="xSmall" className="text-gray-600">
                Thông tin cá nhân của bạn được bảo vệ theo chính sách của Zalo và Review Now. 
                Chúng tôi không chia sẻ dữ liệu cá nhân với bên thứ ba.
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Note */}
        <Box className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <Text size="xSmall" className="text-gray-600 text-center">
            <Icon icon="zi-info-circle" className="text-yellow-600 mr-1" />
            Thông tin được đồng bộ từ tài khoản Zalo của bạn
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default PersonalInfoPage;

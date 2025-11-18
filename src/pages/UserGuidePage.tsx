import React from 'react';
import { Page, Header, Box, Text, Icon } from 'zmp-ui';

const UserGuidePage: React.FC = () => {
  return (
    <Page className="bg-background">
      <Header
        title="Hướng dẫn sử dụng"
        showBackIcon={true}
      />

      <Box className="page-content-with-header">
        {/* Welcome Section */}
        <Box className="card bg-gradient-to-br from-yellow-50 to-white mb-4">
          <Box flex className="items-start space-x-3">
            <Box className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon icon="zi-star-solid" className="text-white" size={24} />
            </Box>
            <Box className="flex-1">
              <Text.Title className="font-bold mb-1">
                Chào mừng đến với Review Now!
              </Text.Title>
              <Text size="small" className="text-gray-600">
                Ứng dụng giúp bạn kiểm tra độ uy tín của shop online trước khi mua hàng
              </Text>
            </Box>
          </Box>
        </Box>

        {/* How to Use */}
        <Box className="card mb-4">
          <Text className="font-semibold text-gray-900 mb-3 flex items-center">
            <Icon icon="zi-search" className="mr-2 text-yellow-600" />
            Cách tìm kiếm shop
          </Text>
          <Box className="space-y-3 ml-6">
            <Box>
              <Text size="small" className="font-medium mb-1">1. Tìm theo số điện thoại</Text>
              <Text size="xSmall" className="text-gray-600">
                Nhập số điện thoại của shop để xem đánh giá và điểm uy tín
              </Text>
            </Box>
            <Box>
              <Text size="small" className="font-medium mb-1">2. Tìm theo tên shop</Text>
              <Text size="xSmall" className="text-gray-600">
                Gõ tên shop hoặc tên người bán để tìm kiếm
              </Text>
            </Box>
            <Box>
              <Text size="small" className="font-medium mb-1">3. Tìm theo link</Text>
              <Text size="xSmall" className="text-gray-600">
                Copy link Facebook, Shopee, TikTok Shop và dán vào ô tìm kiếm
              </Text>
            </Box>
          </Box>
        </Box>

        {/* How to Review */}
        <Box className="card mb-4">
          <Text className="font-semibold text-gray-900 mb-3 flex items-center">
            <Icon icon="zi-star" className="mr-2 text-yellow-600" />
            Cách đánh giá shop
          </Text>
          <Box className="space-y-3 ml-6">
            <Box>
              <Text size="small" className="font-medium mb-1">1. Tìm shop cần đánh giá</Text>
              <Text size="xSmall" className="text-gray-600">
                Nếu shop chưa có, bạn có thể thêm shop mới
              </Text>
            </Box>
            <Box>
              <Text size="small" className="font-medium mb-1">2. Vào trang shop</Text>
              <Text size="xSmall" className="text-gray-600">
                Nhấn nút "Đánh giá shop" hoặc nút vàng góc dưới màn hình
              </Text>
            </Box>
            <Box>
              <Text size="small" className="font-medium mb-1">3. Chọn đánh giá hoặc báo cáo</Text>
              <Text size="xSmall" className="text-gray-600">
                - Đánh giá: Cho điểm từ 1-5 sao và mô tả trải nghiệm<br/>
                - Báo cáo: Cảnh báo shop lừa đảo với bằng chứng
              </Text>
            </Box>
            <Box>
              <Text size="small" className="font-medium mb-1">4. Gửi đánh giá</Text>
              <Text size="xSmall" className="text-gray-600">
                Đánh giá của bạn sẽ giúp cộng đồng mua sắm an toàn hơn
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Trust Score */}
        <Box className="card mb-4">
          <Text className="font-semibold text-gray-900 mb-3 flex items-center">
            <Icon icon="zi-chart" className="mr-2 text-yellow-600" />
            Hiểu về điểm uy tín
          </Text>
          <Box className="space-y-3 ml-6">
            <Box flex className="items-center space-x-2">
              <Box className="w-12 h-2 bg-green-500 rounded"></Box>
              <Text size="small">70-100: Uy tín cao</Text>
            </Box>
            <Box flex className="items-center space-x-2">
              <Box className="w-12 h-2 bg-yellow-500 rounded"></Box>
              <Text size="small">40-69: Trung bình</Text>
            </Box>
            <Box flex className="items-center space-x-2">
              <Box className="w-12 h-2 bg-red-500 rounded"></Box>
              <Text size="small">0-39: Cần cảnh giác</Text>
            </Box>
          </Box>
          <Box className="mt-3 p-3 bg-gray-50 rounded-lg">
            <Text size="xSmall" className="text-gray-600">
              Điểm uy tín được tính toán dựa trên số lượng và chất lượng đánh giá từ cộng đồng. 
              Shop có nhiều đánh giá tích cực sẽ có điểm cao hơn.
            </Text>
          </Box>
        </Box>

        {/* Tips */}
        <Box className="card bg-blue-50 border-blue-200">
          <Text className="font-semibold text-blue-900 mb-2 flex items-center">
            <Icon icon="zi-star" className="mr-2 text-blue-600" />
            Mẹo sử dụng hiệu quả
          </Text>
          <Box className="space-y-2 ml-6">
            <Text size="xSmall" className="text-gray-700">
              ✓ Luôn kiểm tra shop trước khi chuyển tiền
            </Text>
            <Text size="xSmall" className="text-gray-700">
              ✓ Đọc kỹ các đánh giá tiêu cực để cảnh giác
            </Text>
            <Text size="xSmall" className="text-gray-700">
              ✓ Chia sẻ trải nghiệm của bạn để giúp người khác
            </Text>
            <Text size="xSmall" className="text-gray-700">
              ✓ Báo cáo shop lừa đảo có bằng chứng cụ thể
            </Text>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default UserGuidePage;

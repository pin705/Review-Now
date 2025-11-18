import React, { useState } from 'react';
import { Page, Header, Box, Text, Icon, Tabs } from 'zmp-ui';

const TermsAndPrivacyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <Page className="bg-background">
      <Header
        title="Điều khoản & Bảo mật"
        showBackIcon={true}
      />

      <Box className="page-content-with-header">
        {/* Tabs */}
        <Box className="mb-4">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
          >
            <Tabs.Tab key="terms" label="Điều khoản sử dụng" />
            <Tabs.Tab key="privacy" label="Bảo mật" />
          </Tabs>
        </Box>

        {/* Terms of Service */}
        {activeTab === 'terms' && (
          <Box className="space-y-4">
            {/* Acceptance */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-2">
                1. Chấp nhận điều khoản
              </Text>
              <Text size="small" className="text-gray-600">
                Bằng cách sử dụng Mini App Review Now, người dùng đồng ý tuân thủ các điều khoản này 
                và Chính sách Quyền riêng tư.
              </Text>
            </Box>

            {/* Purpose */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-2">
                2. Mục đích Ứng dụng
              </Text>
              <Text size="small" className="text-gray-600 mb-2">
                Mini App được cung cấp cho mục đích duy nhất là thu thập và hiển thị đánh giá cộng đồng 
                về độ tin cậy của các Cửa hàng/Tài khoản kinh doanh trực tuyến.
              </Text>
              <Text size="small" className="text-gray-600">
                Mini App chỉ đóng vai trò trung gian trong việc cung cấp thông tin dựa trên dữ liệu cộng đồng 
                và không phải là bên trung gian giao dịch.
              </Text>
            </Box>

            {/* Rules */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-3">
                3. Quy tắc Đóng góp và Đánh giá
              </Text>
              <Box className="space-y-3">
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Tính xác thực
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Người dùng cam kết mọi đánh giá, báo cáo đều dựa trên trải nghiệm thực tế 
                    và có thể cung cấp bằng chứng (ví dụ: ảnh chụp màn hình đơn hàng, tin nhắn giao dịch).
                  </Text>
                </Box>
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Nghiêm cấm
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Nghiêm cấm mọi hành vi vu vạ, bôi nhọ, đánh giá sai lệch có mục đích hạ thấp uy tín 
                    của Shop/đối thủ cạnh tranh.
                  </Text>
                </Box>
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Quyền của Shop
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Chủ Shop có quyền phản hồi công khai các đánh giá và báo cáo, đồng thời yêu cầu 
                    Admin Mini App xem xét xóa các đánh giá được chứng minh là sai sự thật.
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Disclaimer */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-3">
                4. Miễn trừ trách nhiệm
              </Text>
              <Box className="space-y-2">
                <Text size="small" className="text-gray-600">
                  • Mini App không chịu trách nhiệm về bất kỳ tổn thất tài chính hoặc thiệt hại nào 
                  phát sinh từ giao dịch giữa người dùng và các Cửa hàng được đánh giá.
                </Text>
                <Text size="small" className="text-gray-600">
                  • Mini App không đảm bảo tính chính xác 100% của Điểm tin cậy, vì số này phụ thuộc 
                  vào dữ liệu do cộng đồng cung cấp.
                </Text>
              </Box>
            </Box>
          </Box>
        )}

        {/* Privacy Policy */}
        {activeTab === 'privacy' && (
          <Box className="space-y-4">
            {/* Data Collection */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-3">
                1. Dữ liệu Thu thập
              </Text>
              <Box className="space-y-3">
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Dữ liệu Zalo (Bắt buộc)
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    • Zalo ID (Định danh người dùng duy nhất)<br/>
                    • Tên hiển thị và ảnh đại diện (chỉ để hiển thị người đánh giá)
                  </Text>
                </Box>
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Dữ liệu Ứng dụng (Tự nguyện)
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    • Lịch sử tra cứu của người dùng<br/>
                    • Nội dung đánh giá, báo cáo và bằng chứng (ảnh chụp màn hình)<br/>
                    • Địa chỉ IP và thông tin thiết bị (mục đích phân tích và bảo mật)
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Purpose */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-3">
                2. Mục đích Sử dụng Dữ liệu
              </Text>
              <Box className="space-y-2">
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Phân tích và Tính điểm Uy tín
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Dữ liệu đánh giá được sử dụng để tính toán và hiển thị Điểm tin cậy.
                  </Text>
                </Box>
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Bảo mật
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Zalo ID, Địa chỉ IP được sử dụng để chống spam, ngăn chặn lạm dụng hệ thống 
                    và đảm bảo mỗi người dùng chỉ có một lượt đánh giá cho mỗi giao dịch.
                  </Text>
                </Box>
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Cải tiến Dịch vụ
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Phân tích lịch sử tra cứu để tối ưu hóa giao diện và chức năng tìm kiếm.
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Data Sharing */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-3">
                3. Chia sẻ Dữ liệu
              </Text>
              <Box className="space-y-2">
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Dữ liệu cá nhân (Zalo ID, SĐT)
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Tuyệt đối không chia sẻ, bán hoặc cho thuê dữ liệu cá nhân của người dùng cho bên thứ ba.
                  </Text>
                </Box>
                <Box>
                  <Text size="small" className="font-medium text-gray-800 mb-1">
                    Dữ liệu đánh giá (Nội dung, Tên hiển thị)
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Nội dung đánh giá và tên hiển thị công khai trên Zalo được hiển thị công khai 
                    trên Hồ sơ Shop để phục vụ mục đích minh bạch.
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Security */}
            <Box className="card">
              <Text className="font-semibold text-gray-900 mb-2">
                4. Bảo mật dữ liệu
              </Text>
              <Text size="small" className="text-gray-600 mb-2">
                Mini App cam kết áp dụng các tiêu chuẩn bảo mật an toàn để bảo vệ dữ liệu người dùng 
                khỏi quyền truy cập trái phép hoặc mất mát.
              </Text>
              <Text size="small" className="text-gray-600">
                Mọi dữ liệu thanh toán (qua Zalo Pay) đều được xử lý trực tiếp bởi Zalo Pay, 
                Mini App không lưu trữ bất kỳ thông tin thẻ hoặc tài khoản ngân hàng nào.
              </Text>
            </Box>

            {/* Contact */}
            <Box className="card bg-green-50 border-green-200">
              <Box flex className="items-start space-x-3">
                <Icon icon="zi-check-circle" className="text-green-600 mt-0.5" />
                <Box className="flex-1">
                  <Text size="small" className="font-medium text-green-900 mb-1">
                    Cam kết bảo mật
                  </Text>
                  <Text size="xSmall" className="text-gray-600">
                    Review Now tuân thủ nghiêm ngặt chính sách bảo mật của Zalo và luật pháp Việt Nam. 
                    Thông tin cá nhân của bạn luôn được bảo vệ an toàn.
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default TermsAndPrivacyPage;

import React, { useState } from 'react';
import { Page, Header, Button, Icon, Box, Text, Input, Select, useSnackbar } from 'zmp-ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { shopService } from '../services/shop.service';
import { Section } from '../components/section';
import { useRecoilValue } from 'recoil';
import { userState } from '../state';

const { Option } = Select;

const AddShopPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const snackbar = useSnackbar();
  const user = useRecoilValue(userState);
  
  // Pre-fill from search if available
  const searchParams = new URLSearchParams(location.search);
  const preFilledPhone = searchParams.get('phone') || '';
  const preFilledLink = searchParams.get('link') || '';
  
  // Form state
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState(preFilledPhone);
  const [link, setLink] = useState(preFilledLink);
  const [platform, setPlatform] = useState<string>('');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [reviewContent, setReviewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Validation
  const isValidName = shopName.trim().length > 0 && !['shop', 'shop bán hàng', 'cửa hàng'].includes(shopName.trim().toLowerCase());
  const isValidPhone = phone.trim().length >= 10;
  const isValidReview = reviewContent.trim().length >= 50;
  const canSubmit = isValidName && isValidPhone && isValidReview && !submitting;

  const platformOptions = [
    { value: 'zalo', label: 'Zalo', icon: 'zi-chat' },
    { value: 'facebook', label: 'Facebook', icon: 'zi-logo-facebook' },
    { value: 'shopee', label: 'Shopee', icon: 'zi-shop' },
    { value: 'lazada', label: 'Lazada', icon: 'zi-shop' },
    { value: 'tiki', label: 'Tiki', icon: 'zi-shop' },
    { value: 'sendo', label: 'Sendo', icon: 'zi-shop' },
    { value: 'website', label: 'Website', icon: 'zi-globe' },
    { value: 'other', label: 'Khác', icon: 'zi-more-grid' },
  ];

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    setSubmitting(true);
    
    try {
      // Create new shop
      const newShop = await shopService.createShop({
        name: shopName.trim(),
        phone: phone.trim(),
        link: link.trim() || undefined,
        platform: platform || 'other',
        verified: false,
      });
      
      // Add initial review
      await shopService.addReview({
        shopId: newShop.id,
        userId: user.id || 'anonymous',
        userName: user.name || 'Người dùng ẩn danh',
        rating,
        content: reviewContent.trim(),
        type: rating >= 3 ? 'positive' : 'negative',
        helpful: 0,
      });
      
      snackbar.openSnackbar({
        text: 'Thêm shop và đánh giá thành công!',
        type: 'success',
      });
      
      // Navigate to the new shop page
      navigate(`/shop/${newShop.id}`);
    } catch (error) {
      console.error('Error creating shop:', error);
      snackbar.openSnackbar({
        text: 'Có lỗi xảy ra. Vui lòng thử lại!',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page className="bg-background">
      <Header 
        title="Thêm shop mới"
        showBackIcon={true}
        onBackClick={() => navigate(-1)}
      />

      <Box className="page-content-with-header space-y-4">
        {/* Header Info */}
        <Box className="card bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
          <Box className="flex items-start gap-3">
            <Box className="w-12 h-12 bg-[#eab308] rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon icon="zi-plus-circle-solid" size={24} className="text-white" />
            </Box>
            <Box className="flex-1">
              <Text.Title size="small" className="text-gray-900 mb-1">
                Chia sẻ trải nghiệm
              </Text.Title>
              <Text size="xSmall" className="text-gray">
                Giúp cộng đồng tìm được shop uy tín
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Shop Name */}
        <Section title="Tên Shop" padding="none">
          <Input
            type="text"
            placeholder="VD: Shop thời trang ABC"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            clearable
          />
          {shopName && !isValidName && (
            <Text size="xxSmall" className="text-red-500 mt-1 flex items-center gap-1">
              <Icon icon="zi-warning-solid" size={12} />
              Vui lòng nhập tên cụ thể, tránh dùng tên chung
            </Text>
          )}
          <Text size="xxSmall" className="text-gray mt-1">
            Bắt buộc • Nhập tên shop cụ thể, không dùng chung
          </Text>
        </Section>

        {/* Phone Number */}
        <Section title="Số điện thoại" padding="none">
          <Input
            type="tel"
            placeholder="0901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            clearable
          />
          {phone && !isValidPhone && (
            <Text size="xxSmall" className="text-red-500 mt-1 flex items-center gap-1">
              <Icon icon="zi-warning-solid" size={12} />
              Số điện thoại phải có ít nhất 10 số
            </Text>
          )}
          <Text size="xxSmall" className="text-gray mt-1">
            Bắt buộc • Thông tin liên hệ chính
          </Text>
        </Section>

        {/* Link (Optional) */}
        <Section title="Link shop" padding="none">
          <Input
            type="url"
            placeholder="https://zalo.me/... hoặc facebook.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            clearable
          />
          <Text size="xxSmall" className="text-gray mt-1">
            Tùy chọn • Link Zalo, Facebook, hoặc sàn TMĐT
          </Text>
        </Section>

        {/* Platform */}
        <Section title="Nền tảng hoạt động" padding="none">
          <Select
            placeholder="Chọn nền tảng"
            value={platform}
            onChange={(value) => setPlatform(value as string)}
          >
            {platformOptions.map((option) => (
              <Option key={option.value} value={option.value} title={option.label}>
                <Box className="flex items-center gap-2">
                  <Icon icon={option.icon as any} size={20} />
                  <Text>{option.label}</Text>
                </Box>
              </Option>
            ))}
          </Select>
          <Text size="xxSmall" className="text-gray mt-1">
            Tùy chọn • Nền tảng shop đang hoạt động
          </Text>
        </Section>

        {/* Rating */}
        <Section title="Đánh giá của bạn" padding="none">
          <Box className="flex justify-center gap-3 py-4 bg-gray-50 rounded-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                className="transform transition-transform hover:scale-110 active:scale-95"
              >
                <Icon
                  icon={star <= rating ? 'zi-star-solid' : 'zi-star'}
                  className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                  size={40}
                />
              </button>
            ))}
          </Box>
          <Box className="text-center mt-2">
            <Text className="text-gray-700 font-medium">
              {rating === 5 && '⭐ Xuất sắc'}
              {rating === 4 && '😊 Tốt'}
              {rating === 3 && '😐 Trung bình'}
              {rating === 2 && '😞 Kém'}
              {rating === 1 && '😡 Rất tệ'}
            </Text>
          </Box>
          <Text size="xxSmall" className="text-gray mt-2">
            Bắt buộc • Đánh giá từ 1 đến 5 sao
          </Text>
        </Section>

        {/* Review Content */}
        <Section title="Nội dung đánh giá" padding="none">
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Chia sẻ chi tiết về trải nghiệm của bạn: chất lượng sản phẩm, dịch vụ, thái độ, giao hàng..."
            className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-none resize-none"
            maxLength={500}
          />
          <Box className="flex justify-between items-center mt-2">
            <Text size="xxSmall" className={reviewContent.length < 50 ? "text-red-500" : "text-green-600"}>
              {reviewContent.length < 50 && (
                <span className="flex items-center gap-1">
                  <Icon icon="zi-warning-solid" size={12} />
                  Còn {50 - reviewContent.length} ký tự để đạt tối thiểu
                </span>
              )}
              {reviewContent.length >= 50 && (
                <span className="flex items-center gap-1">
                  <Icon icon="zi-check-circle-solid" size={12} />
                  Đã đủ độ dài
                </span>
              )}
            </Text>
            <Text size="xxSmall" className="text-gray">
              {reviewContent.length}/500
            </Text>
          </Box>
          <Text size="xxSmall" className="text-gray mt-1">
            Bắt buộc • Tối thiểu 50 ký tự để đảm bảo chất lượng
          </Text>
        </Section>

        {/* Guidelines */}
        <Box className="card bg-blue-50 border-blue-200">
          <Box className="flex items-start gap-2">
            <Icon icon="zi-info-circle-solid" className="text-blue-600 mt-0.5" size={18} />
            <Box className="flex-1">
              <Text className="font-medium text-blue-900 mb-2">
                Hướng dẫn đánh giá
              </Text>
              <Box className="text-blue-800 space-y-1">
                <Text size="xSmall">• Cung cấp thông tin chính xác và trung thực</Text>
                <Text size="xSmall">• Mô tả chi tiết trải nghiệm thực tế của bạn</Text>
                <Text size="xSmall">• Tránh ngôn từ thô tục, xúc phạm</Text>
                <Text size="xSmall">• Đánh giá dựa trên chất lượng sản phẩm/dịch vụ</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          variant="primary"
          size="large"
          fullWidth
          loading={submitting}
        >
          <Icon icon="zi-check-circle-solid" />
          Thêm shop & Gửi đánh giá
        </Button>

        {/* Validation Summary */}
        {!canSubmit && !submitting && (
          <Box className="card bg-yellow-50 border-yellow-200">
            <Text size="xSmall" className="font-medium text-yellow-900 mb-2">
              Vui lòng hoàn thiện các thông tin:
            </Text>
            <Box className="space-y-1">
              {!isValidName && (
                <Text size="xxSmall" className="text-yellow-800 flex items-center gap-1">
                  <Icon icon="zi-close-circle" size={12} />
                  Tên shop hợp lệ
                </Text>
              )}
              {!isValidPhone && (
                <Text size="xxSmall" className="text-yellow-800 flex items-center gap-1">
                  <Icon icon="zi-close-circle" size={12} />
                  Số điện thoại hợp lệ
                </Text>
              )}
              {!isValidReview && (
                <Text size="xxSmall" className="text-yellow-800 flex items-center gap-1">
                  <Icon icon="zi-close-circle" size={12} />
                  Nội dung đánh giá tối thiểu 50 ký tự
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default AddShopPage;

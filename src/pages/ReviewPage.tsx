import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page, Header, Button, Icon, Box, useSnackbar } from 'zmp-ui';
import { Shop } from '../types';
import { shopService } from '../services/shop.service';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRecoilValue } from 'recoil';
import { userState } from '../state';

const ReviewPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const user = useRecoilValue(userState);
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [content, setContent] = useState('');
  const [reviewType, setReviewType] = useState<'review' | 'report'>('review');

  useEffect(() => {
    loadShop();
  }, [shopId]);

  const loadShop = async () => {
    if (!shopId) return;
    
    try {
      const shopData = await shopService.getShopById(shopId);
      setShop(shopData);
    } catch (error) {
      console.error('Error loading shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!shop || !content.trim()) return;
    
    setSubmitting(true);
    
    try {
      if (reviewType === 'review') {
        await shopService.addReview({
          shopId: shop.id,
          userId: user.id || 'anonymous',
          userName: user.name || 'Người dùng ẩn danh',
          rating,
          content: content.trim(),
          type: rating >= 3 ? 'positive' : 'negative',
          helpful: 0
        });
      } else {
        await shopService.addReport({
          shopId: shop.id,
          userId: user.id || 'anonymous',
          userName: user.name || 'Người dùng ẩn danh',
          reason: 'other',
          content: content.trim()
        });
      }
      
      // Show success message using zmp-ui snackbar
      snackbar.openSnackbar({
        text: reviewType === 'review' ? 'Đánh giá của bạn đã được gửi!' : 'Báo cáo của bạn đã được gửi!',
        type: 'success',
      });
      
      // Navigate back
      navigate(`/shop/${shop.id}`);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!shop) {
    return (
      <Page className="bg-gray-50">
        <Header title="Đánh giá shop" />
        <Box className="flex items-center justify-center min-h-[60vh]">
          <Box className="text-center">
            <p className="text-gray-600 mb-4">Không tìm thấy shop</p>
            <Button onClick={() => navigate('/')} variant="secondary">
              Quay lại trang chủ
            </Button>
          </Box>
        </Box>
      </Page>
    );
  }

  return (
    <Page className="bg-gray-50">
      <Header 
        title={reviewType === 'review' ? 'Đánh giá shop' : 'Báo cáo shop'}
        showBackIcon={true}
        onBackClick={() => navigate(-1)}
      />

      <Box className="page-content-with-header">
        {/* Shop Info */}
        <Box className="card fade-in">
          <h3 className="font-semibold text-gray-900 mb-2">{shop.name}</h3>
          {shop.phone && (
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Icon icon="zi-call" size={14} />
              {shop.phone}
            </p>
          )}
        </Box>

        {/* Type Selector */}
        <Box className="flex gap-2">
          <Button
            onClick={() => setReviewType('review')}
            variant={reviewType === 'review' ? 'primary' : 'secondary'}
            fullWidth
            icon={<Icon icon="zi-star-solid" />}
          >
            Đánh giá
          </Button>
          <Button
            onClick={() => setReviewType('report')}
            variant={reviewType === 'report' ? 'primary' : 'secondary'}
            fullWidth
            icon={<Icon icon="zi-warning-circle" />}
            className={reviewType === 'report' ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            Báo cáo
          </Button>
        </Box>

        {/* Rating (only for review) */}
        {reviewType === 'review' && (
          <Box className="card fade-in">
            <h3 className="card-header">Đánh giá của bạn</h3>
            <Box className="flex justify-center gap-3 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                  className="transform transition-transform hover:scale-110 active:scale-95"
                >
                  <Icon
                    icon={star <= rating ? 'zi-star-solid' : 'zi-star'}
                    className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                    size={48}
                  />
                </button>
              ))}
            </Box>
            <Box className="text-center text-gray-600">
              {rating === 5 && '⭐ Xuất sắc'}
              {rating === 4 && '😊 Tốt'}
              {rating === 3 && '😐 Trung bình'}
              {rating === 2 && '😞 Kém'}
              {rating === 1 && '😡 Rất tệ'}
            </Box>
          </Box>
        )}

        {/* Content */}
        <Box className="card">
          <h3 className="card-header">
            {reviewType === 'review' ? 'Chia sẻ trải nghiệm của bạn' : 'Mô tả vấn đề'}
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              reviewType === 'review'
                ? 'Hãy chia sẻ trải nghiệm mua hàng của bạn với shop này...'
                : 'Mô tả chi tiết vấn đề bạn gặp phải với shop này...'
            }
            className="w-full min-h-[150px] p-3 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all resize-none"
            maxLength={500}
          />
          <Box className="text-right text-xs text-gray-500 mt-2">
            {content.length}/500 ký tự
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || submitting}
          variant="primary"
          size="large"
          fullWidth
          loading={submitting}
          className={reviewType === 'report' ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          {reviewType === 'review' ? 'Gửi đánh giá' : 'Gửi báo cáo'}
        </Button>

        {/* Guidelines */}
        <Box className="card bg-yellow-50 border-yellow-100">
          <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-1">
            <Icon icon="zi-info-circle" size={16} />
            Lưu ý khi {reviewType === 'review' ? 'đánh giá' : 'báo cáo'}
          </h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Cung cấp thông tin chính xác và trung thực</li>
            <li>• Tránh sử dụng ngôn từ thô tục, xúc phạm</li>
            <li>• Nêu rõ chi tiết trải nghiệm của bạn</li>
            {reviewType === 'report' && (
              <li>• Có thể đính kèm bằng chứng nếu cần</li>
            )}
          </ul>
        </Box>
      </Box>
    </Page>
  );
};

export default ReviewPage;

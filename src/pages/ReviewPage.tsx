import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input } from 'zmp-ui';
import { Shop, Review } from '../types';
import { shopService } from '../services/shop.service';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRecoilValue } from 'recoil';
import { userState } from '../state';

const ReviewPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
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
          type: rating >= 3 ? 'positive' : 'negative'
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
      
      // Show success message
      alert(reviewType === 'review' ? 'Đánh giá của bạn đã được gửi!' : 'Báo cáo của bạn đã được gửi!');
      
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy shop</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Quay lại trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 safe-area-top">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {reviewType === 'review' ? 'Đánh giá shop' : 'Báo cáo shop'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Shop Info */}
        <div className="card fade-in">
          <h3 className="font-semibold text-gray-900 mb-1">{shop.name}</h3>
          <p className="text-sm text-gray-600">
            {shop.phone && `📱 ${shop.phone}`}
          </p>
        </div>

        {/* Type Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setReviewType('review')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              reviewType === 'review'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            ⭐ Đánh giá
          </button>
          <button
            onClick={() => setReviewType('report')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              reviewType === 'report'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200'
            }`}
          >
            🚨 Báo cáo
          </button>
        </div>

        {/* Rating (only for review) */}
        {reviewType === 'review' && (
          <div className="card fade-in">
            <h3 className="card-header">Đánh giá của bạn</h3>
            <div className="flex justify-center gap-3 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
                  className="transform transition-transform hover:scale-110 active:scale-95"
                >
                  <svg
                    className={`w-12 h-12 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="text-center text-gray-600">
              {rating === 5 && '⭐ Xuất sắc'}
              {rating === 4 && '😊 Tốt'}
              {rating === 3 && '😐 Trung bình'}
              {rating === 2 && '😞 Kém'}
              {rating === 1 && '😡 Rất tệ'}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="card">
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
            className="w-full min-h-[150px] p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-500 mt-2">
            {content.length}/500 ký tự
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || submitting}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
            reviewType === 'review'
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-red-500 hover:bg-red-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {submitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang gửi...</span>
            </div>
          ) : (
            reviewType === 'review' ? '✍️ Gửi đánh giá' : '🚨 Gửi báo cáo'
          )}
        </Button>

        {/* Guidelines */}
        <div className="card bg-blue-50 border-blue-100">
          <h4 className="font-medium text-blue-900 mb-2">
            💡 Lưu ý khi {reviewType === 'review' ? 'đánh giá' : 'báo cáo'}
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Cung cấp thông tin chính xác và trung thực</li>
            <li>• Tránh sử dụng ngôn từ thô tục, xúc phạm</li>
            <li>• Nêu rõ chi tiết trải nghiệm của bạn</li>
            {reviewType === 'report' && (
              <li>• Có thể đính kèm bằng chứng nếu cần</li>
            )}
          </ul>
        </div>
      </div>

      {/* Safe area bottom */}
      <div className="safe-area-bottom" />
    </div>
  );
};

export default ReviewPage;

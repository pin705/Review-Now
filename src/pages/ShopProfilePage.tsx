import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tabs, Icon } from 'zmp-ui';
import { Shop, Review } from '../types';
import { shopService } from '../services/shop.service';
import TrustScoreCard from '../components/TrustScoreCard';
import ReviewCard from '../components/ReviewCard';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatPhone, formatDate, getPlatformIconName } from '../utils/helpers';

const ShopProfilePage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'positive' | 'negative'>('all');

  useEffect(() => {
    loadShopData();
  }, [shopId]);

  const loadShopData = async () => {
    if (!shopId) return;
    
    setLoading(true);
    try {
      const [shopData, reviewsData] = await Promise.all([
        shopService.getShopById(shopId),
        shopService.getShopReviews(shopId)
      ]);
      
      setShop(shopData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    return review.type === activeTab;
  });

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon="😕"
          title="Không tìm thấy shop"
          description="Shop này có thể đã bị xóa hoặc không tồn tại"
          action={{
            label: 'Quay lại trang chủ',
            onClick: () => navigate('/')
          }}
        />
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
            <Icon icon="zi-arrow-left" className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Chi tiết shop</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Shop Basic Info */}
        <div className="card fade-in">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-4xl">
              <Icon icon={getPlatformIconName(shop.platform)} size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {shop.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="badge" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                  {shop.platform}
                </span>
                {shop.verified && (
                  <span className="badge verified">
                    <Icon icon="zi-verified" className="mr-1" />
                    Đã xác thực
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            {shop.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Icon icon="zi-call" />
                <span>{formatPhone(shop.phone)}</span>
              </div>
            )}
            {shop.url && (
              <div className="flex items-center gap-2 text-gray-700">
                <Icon icon="zi-link" />
                <a href={shop.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                  {shop.url}
                </a>
              </div>
            )}
            {shop.createdDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Icon icon="zi-calendar" />
                <span>Hoạt động từ {formatDate(shop.createdDate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Trust Score */}
        <TrustScoreCard shop={shop} />

        {/* Add Review Button */}
        <Button
          onClick={() => navigate(`/review/${shop.id}`)}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          ✍️ Đánh giá shop này
        </Button>

        {/* Reviews Section */}
        <div className="card">
          <h3 className="card-header">Đánh giá & Báo cáo</h3>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-gray-200">
            {[
              { key: 'all' as const, label: 'Tất cả', count: reviews.length },
              { key: 'positive' as const, label: 'Tích cực', count: shop.positiveReviews },
              { key: 'negative' as const, label: 'Tiêu cực', count: shop.negativeReviews }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 px-1 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            {filteredReviews.length === 0 ? (
              <EmptyState
                icon="📝"
                title="Chưa có đánh giá"
                description={
                  activeTab === 'all' 
                    ? 'Hãy là người đầu tiên đánh giá shop này'
                    : `Chưa có đánh giá ${activeTab === 'positive' ? 'tích cực' : 'tiêu cực'}`
                }
              />
            ) : (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Safe area bottom */}
      <div className="safe-area-bottom" />
    </div>
  );
};

export default ShopProfilePage;

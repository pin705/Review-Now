import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page, Header, Button, Icon, Box } from 'zmp-ui';
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'positive' | 'negative'>('all');

  useEffect(() => {
    loadShopData();
  }, [shopId]);

  useEffect(() => {
    if (shopId) {
      // reset and load reviews for current tab
      setReviews([]);
      setPage(1);
      loadReviews(1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, shopId]);

  const loadShopData = async () => {
    if (!shopId) return;
    
    setLoading(true);
    try {
      const shopData = await shopService.getShopById(shopId);
      setShop(shopData);
      // first page of reviews will be loaded by loadReviews in the effect tied to activeTab
    } catch (error) {
      console.error('Error loading shop:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (nextPage: number, replace = false) => {
    if (!shopId) return;
    const typeParam = activeTab === 'all' ? undefined : activeTab;
    if (nextPage === 1) {
      setLoadingMore(false);
    } else {
      setLoadingMore(true);
    }
    try {
      const res = await shopService.getShopReviews(shopId, { type: typeParam, page: nextPage, limit: 10 });
      setHasMore(res.hasMore);
      setPage(res.page);
      setReviews((prev) => (replace ? res.items : [...prev, ...res.items]));
    } catch (e) {
      console.error('Error loading reviews:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!shop) {
    return (
      <Page className="bg-gray-50">
        <Header title="Chi tiết shop" />
        <Box className="flex items-center justify-center min-h-[60vh]">
          <EmptyState
            icon="zi-info-circle"
            title="Không tìm thấy shop"
            description="Shop này có thể đã bị xóa hoặc không tồn tại"
            action={{
              label: 'Quay lại trang chủ',
              onClick: () => navigate('/')
            }}
          />
        </Box>
      </Page>
    );
  }

  return (
    <Page className="bg-gray-50">
      <Header title="Chi tiết shop" showBackIcon={true} onBackClick={() => navigate(-1)} />

      <Box className="page-content-with-header space-y-4">
        {/* Shop Basic Info */}
        <Box className="card fade-in">
          <Box className="flex items-start gap-3 mb-4">
            <Icon icon={getPlatformIconName(shop.platform) as any} size={32} />
            <Box className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {shop.name}
              </h2>
              <Box className="flex flex-wrap gap-2">
                <Box className="badge-yellow">
                  {shop.platform}
                </Box>
                {shop.verified && (
                  <Box className="badge-verified">
                    <Icon icon="zi-check-circle-solid" size={14} />
                    Đã xác thực
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box className="space-y-2 text-sm">
            {shop.phone && (
              <Box className="flex items-center gap-2 text-gray-700">
                <Icon icon="zi-call" size={16} />
                <span>{formatPhone(shop.phone)}</span>
              </Box>
            )}
            {shop.url && (
              <Box className="flex items-center gap-2 text-gray-700">
                <Icon icon="zi-link" size={16} />
                <a href={shop.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                  {shop.url}
                </a>
              </Box>
            )}
            {shop.createdDate && (
              <Box className="flex items-center gap-2 text-gray-600">
                <Icon icon="zi-calendar" size={16} />
                <span>Hoạt động từ {formatDate(shop.createdDate)}</span>
              </Box>
            )}
          </Box>
        </Box>

        {/* Trust Score */}
        <TrustScoreCard shop={shop} />

        {/* Actions */}
        <Box className="flex items-center gap-3">
          <Button
            onClick={() => navigate(`/review/${shop.id}?type=review`)}
            variant="primary"
            size="medium"
            fullWidth
            icon={<Icon icon="zi-edit" />}
          >
            Đánh giá
          </Button>
          <Button
            onClick={() => navigate(`/review/${shop.id}?type=report`)}
            variant="secondary"
            size="medium"
            fullWidth
            icon={<Icon icon="zi-warning-circle" />}
            className="!bg-red-50 !text-red-600 hover:!bg-red-100"
          >
            Báo cáo
          </Button>
        </Box>

        {/* Reviews Section */}
        <Box className="card">
          <h3 className="card-header">Đánh giá & Báo cáo</h3>
          
          {/* Tabs */}
          <Box className="flex gap-2 mb-4 border-b border-gray-200">
            {[
              { key: 'all' as const, label: 'Tất cả', count: shop.totalReviews },
              { key: 'positive' as const, label: 'Tích cực', count: shop.positiveReviews },
              { key: 'negative' as const, label: 'Tiêu cực', count: shop.negativeReviews }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 px-1 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </Box>

          {/* Reviews List */}
          <Box className="space-y-3">
            {reviews.length === 0 ? (
              <EmptyState
                icon="zi-note"
                title="Chưa có đánh giá"
                description={
                  activeTab === 'all' 
                    ? 'Hãy là người đầu tiên đánh giá shop này'
                    : `Chưa có đánh giá ${activeTab === 'positive' ? 'tích cực' : 'tiêu cực'}`
                }
              />
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
            {hasMore && (
              <Button
                onClick={() => loadReviews(page + 1)}
                loading={loadingMore}
                variant="tertiary"
                fullWidth
              >
                Tải thêm
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default ShopProfilePage;

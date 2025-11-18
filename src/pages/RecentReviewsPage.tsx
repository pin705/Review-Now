import React, { useState, useEffect } from 'react';
import { Page, Header, Icon, Button, Box } from 'zmp-ui';
import { shopService } from '../services/shop.service';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const RecentReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadRecentReviews();
  }, []);

  const loadRecentReviews = async () => {
    setLoading(true);
    try {
      const res = await shopService.getRecentReviews(1, 10);
      setReviews(res.items);
      setHasMore(res.hasMore);
      setPage(1);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const next = page + 1;
    setLoadingMore(true);
    try {
      const res = await shopService.getRecentReviews(next, 10);
      setReviews((prev) => [...prev, ...res.items]);
      setHasMore(res.hasMore);
      setPage(next);
    } catch (e) {
      console.error('Error loading more reviews:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <Page className="bg-background">
      <Header
        title="Đánh giá gần đây"
        showBackIcon={false}
      />

      <div className="page-content-with-header">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {reviews.length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Tổng đánh giá</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {reviews.filter(r => r.type === 'positive').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Tích cực</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-red-600">
              {reviews.filter(r => r.type === 'negative').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Tiêu cực</div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="card bg-yellow-50 border-yellow-200 mb-4">
          <div className="flex items-start gap-3">
            <Icon icon="zi-info-circle" className="text-yellow-600 mt-0.5" />
            <div className="flex-1 text-sm text-gray-700">
              <p className="font-medium text-yellow-900 mb-1">
                Cộng đồng Review Now
              </p>
              <p className="text-gray-600">
                Cùng nhau xây dựng môi trường mua sắm online an toàn và minh bạch
              </p>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {loading && <LoadingSpinner />}
        
        {!loading && reviews.length === 0 && (
          <EmptyState
            icon="zi-star"
            title="Chưa có đánh giá"
            description="Hãy là người đầu tiên đánh giá shop để giúp cộng đồng"
          />
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-2">
              Đánh giá mới nhất
            </h3>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {hasMore && (
              <Box className="mt-2">
                <Button variant="tertiary" fullWidth onClick={loadMore} loading={loadingMore}>
                  Tải thêm
                </Button>
              </Box>
            )}
          </div>
        )}
      </div>
    </Page>
  );
};

export default RecentReviewsPage;

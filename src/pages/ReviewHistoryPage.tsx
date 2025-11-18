import React, { useState, useEffect } from 'react';
import { Page, Header, Icon, Box, Text } from 'zmp-ui';
import { shopService } from '../services/shop.service';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const ReviewHistoryPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserReviews();
  }, []);

  const loadUserReviews = async () => {
    setLoading(true);
    try {
      // In a real app, this would filter by current user's ID from Zalo auth
      // For now, we'll show all reviews as demo
      const allReviews = await shopService.getAllRecentReviews();
      setReviews(allReviews);
    } catch (error) {
      console.error('Error loading user reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="bg-background">
      <Header
        title="Lịch sử đánh giá"
        showBackIcon={true}
      />

      <Box className="page-content-with-header">
        {/* Stats Section */}
        <Box className="grid grid-cols-3 gap-3 mb-4">
          <Box className="card text-center">
            <Text className="text-2xl font-bold text-yellow-600">
              {reviews.length}
            </Text>
            <Text size="xxSmall" className="text-gray-600 mt-1">Đánh giá của bạn</Text>
          </Box>
          <Box className="card text-center">
            <Text className="text-2xl font-bold text-green-600">
              {reviews.filter(r => r.type === 'positive').length}
            </Text>
            <Text size="xxSmall" className="text-gray-600 mt-1">Tích cực</Text>
          </Box>
          <Box className="card text-center">
            <Text className="text-2xl font-bold text-red-600">
              {reviews.filter(r => r.type === 'negative').length}
            </Text>
            <Text size="xxSmall" className="text-gray-600 mt-1">Tiêu cực</Text>
          </Box>
        </Box>

        {/* Info Banner */}
        <Box className="card bg-blue-50 border-blue-200 mb-4">
          <Box flex className="items-start space-x-3">
            <Icon icon="zi-info-circle" className="text-blue-600 mt-0.5" />
            <Box className="flex-1">
              <Text size="small" className="font-medium text-blue-900 mb-1">
                Đóng góp của bạn
              </Text>
              <Text size="xSmall" className="text-gray-600">
                Cảm ơn bạn đã góp phần xây dựng cộng đồng mua sắm an toàn
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Reviews List */}
        {loading && <LoadingSpinner />}
        
        {!loading && reviews.length === 0 && (
          <EmptyState
            icon="zi-star"
            title="Chưa có đánh giá"
            description="Bạn chưa đánh giá shop nào. Hãy chia sẻ trải nghiệm của bạn!"
          />
        )}

        {!loading && reviews.length > 0 && (
          <Box className="space-y-3">
            <Text className="font-semibold text-gray-900 mb-2">
              Các đánh giá của bạn
            </Text>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default ReviewHistoryPage;

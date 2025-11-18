import React from 'react';
import { Review } from '../types';
import { formatDate } from '../utils/helpers';
import { Icon } from 'zmp-ui';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={star <= review.rating ? 'zi-star-solid' : 'zi-star'}
          className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
          size={16}
        />
      ))}
    </div>
  );

  // Check if review needs moderation
  const needsModeration = review.needsModeration && review.isFirstReview;

  return (
    <div className={`card fade-in mb-3 ${needsModeration ? 'opacity-60 bg-gray-50' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="font-medium text-gray-900">{review.userName}</div>
          <div className="flex items-center gap-2 mt-1">
            {renderStars()}
            <span className="text-xs text-gray-500">
              {formatDate(review.createdAt)}
            </span>
            {needsModeration && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                Đang kiểm duyệt
              </span>
            )}
          </div>
        </div>
        <span className={`badge ${review.type === 'positive' ? 'success' : 'danger'}`}>
          <Icon icon={(review.type === 'positive' ? 'zi-check-circle-solid' : 'zi-close-circle-solid') as any} className="mr-1" />
          {review.type === 'positive' ? 'Tích cực' : 'Tiêu cực'}
        </span>
      </div>
      
      {needsModeration ? (
        <div className="text-gray-500 text-sm italic bg-white p-3 rounded border border-gray-200">
          <Icon icon="zi-info-circle" size={16} className="inline mr-1" />
          Nội dung đánh giá đầu tiên sẽ được hiển thị sau khi có ít nhất 2 người dùng khác đánh giá shop này.
        </div>
      ) : (
        <>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {review.content}
          </p>
          
          {/* Image Gallery */}
          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {review.images.map((imageUrl, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={imageUrl} 
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(imageUrl, '_blank')}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Hữu ích ({review.helpful})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;

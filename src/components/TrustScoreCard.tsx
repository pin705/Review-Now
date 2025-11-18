import React from 'react';
import { Shop } from '../types';
import { getTrustScoreLevel, getTrustScoreLabel, getPlatformIconName } from '../utils/helpers';
import { Icon } from 'zmp-ui';

interface TrustScoreCardProps {
  shop: Shop;
}

const TrustScoreCard: React.FC<TrustScoreCardProps> = ({ shop }) => {
  const scoreLevel = getTrustScoreLevel(shop.trustScore);
  const scoreLabel = getTrustScoreLabel(shop.trustScore);

  return (
    <div className="card fade-in">
      <div className="text-center">
        {/* Trust Score */}
        <div className={`trust-score ${scoreLevel} mb-2`}>
          {shop.trustScore}
          <span className="text-2xl font-normal text-gray-400">/100</span>
        </div>
        
        {/* Score Label */}
        <div className={`text-lg font-semibold mb-3 ${
          scoreLevel === 'high' ? 'text-green-600' :
          scoreLevel === 'medium' ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          {scoreLabel}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              scoreLevel === 'high' ? 'bg-green-500' :
              scoreLevel === 'medium' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${shop.trustScore}%` }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {shop.totalReviews}
            </div>
            <div className="text-xs text-gray-500 mt-1">Đánh giá</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {shop.positiveReviews}
            </div>
            <div className="text-xs text-gray-500 mt-1">Tích cực</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {shop.negativeReviews}
            </div>
            <div className="text-xs text-gray-500 mt-1">Tiêu cực</div>
          </div>
        </div>

        {/* Verified Badge */}
        {shop.verified && (
          <div className="mt-4">
            <span className="badge verified">
              <Icon icon="zi-verified" className="mr-1" />
              Đã xác thực
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustScoreCard;

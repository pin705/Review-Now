import React, { useState, useEffect } from 'react';
import { Input, Button } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { shopService } from '../services/shop.service';
import { SearchType, Shop } from '../types';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPlatformIcon, getTrustScoreLevel } from '../utils/helpers';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>('phone');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Shop[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setSearching(true);
    setHasSearched(true);
    
    try {
      const result = await shopService.searchShops(query, searchType);
      setResults(result.shops);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleShopClick = (shop: Shop) => {
    navigate(`/shop/${shop.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white safe-area-top">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Review Now
          </h1>
          <p className="text-sm text-gray-600">
            Kiểm tra độ uy tín shop online
          </p>
        </div>

        {/* Search Type Selector */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 mb-3">
            {[
              { value: 'phone' as SearchType, label: 'Số điện thoại', icon: '📱' },
              { value: 'name' as SearchType, label: 'Tên shop', icon: '🏪' },
              { value: 'link' as SearchType, label: 'Link', icon: '🔗' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setSearchType(type.value)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  searchType === type.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={
                  searchType === 'phone' ? 'Nhập số điện thoại...' :
                  searchType === 'name' ? 'Nhập tên shop...' :
                  'Nhập link shop...'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="input-field"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              disabled={!query.trim() || searching}
            >
              {searching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                '🔍'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        {searching && <LoadingSpinner />}
        
        {!searching && hasSearched && results.length === 0 && (
          <EmptyState
            icon="😕"
            title="Không tìm thấy shop"
            description="Thử tìm kiếm với từ khóa khác hoặc thay đổi phương thức tìm kiếm"
          />
        )}

        {!searching && !hasSearched && (
          <EmptyState
            icon="🔍"
            title="Bắt đầu tìm kiếm"
            description="Nhập thông tin shop để kiểm tra độ uy tín"
          />
        )}

        {!searching && results.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm text-gray-600 mb-3">
              Tìm thấy {results.length} kết quả
            </div>
            {results.map((shop) => {
              const scoreLevel = getTrustScoreLevel(shop.trustScore);
              return (
                <div
                  key={shop.id}
                  onClick={() => handleShopClick(shop)}
                  className="card cursor-pointer hover:shadow-md transition-all fade-in"
                >
                  <div className="flex items-start gap-3">
                    {/* Platform Icon */}
                    <div className="text-3xl">
                      {getPlatformIcon(shop.platform)}
                    </div>

                    {/* Shop Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {shop.name}
                          </h3>
                          {shop.phone && (
                            <p className="text-sm text-gray-600">
                              📱 {shop.phone}
                            </p>
                          )}
                        </div>
                        {shop.verified && (
                          <span className="badge verified text-xs">
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Trust Score */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className={`text-2xl font-bold ${
                          scoreLevel === 'high' ? 'text-green-600' :
                          scoreLevel === 'medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {shop.trustScore}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            {shop.totalReviews} đánh giá
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                scoreLevel === 'high' ? 'bg-green-500' :
                                scoreLevel === 'medium' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${shop.trustScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useState, useEffect } from 'react';
import { Page, Header, Input, Button, Icon, Box } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { shopService } from '../services/shop.service';
import { SearchType, Shop } from '../types';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPlatformIconName, getTrustScoreLevel } from '../utils/helpers';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>('phone');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Shop[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const [stats, setStats] = useState({ totalShops: 0, totalReviews: 0, verified: 0 });

  useEffect(() => {
    loadFeaturedData();
  }, []);

  const loadFeaturedData = async () => {
    try {
      const allShops = await shopService.getAllShops();
      // Get top 3 trusted shops
      const featured = [...allShops]
        .sort((a, b) => b.trustScore - a.trustScore)
        .slice(0, 3);
      setFeaturedShops(featured);

      // Calculate stats
      const totalReviews = allShops.reduce((sum, shop) => sum + shop.totalReviews, 0);
      const verifiedCount = allShops.filter(s => s.verified).length;
      setStats({
        totalShops: allShops.length,
        totalReviews,
        verified: verifiedCount
      });
    } catch (error) {
      console.error('Error loading featured data:', error);
    }
  };

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
    <Page className="bg-gray-50">
      <Header
        title="Review Now"
        subtitle="Kiểm tra độ uy tín shop online"
        showBackIcon={false}
      />

      <Box className="page-content-with-header">
        {/* Stats Cards */}
        <Box className="grid grid-cols-3 gap-3">
          <Box className="stats-card from-yellow-50 to-white">
            <Box className="text-2xl font-bold text-yellow-600">{stats.totalShops}</Box>
            <Box className="text-xs text-gray-600 mt-1">Shops</Box>
          </Box>
          <Box className="stats-card from-green-50 to-white">
            <Box className="text-2xl font-bold text-green-600">{stats.totalReviews}</Box>
            <Box className="text-xs text-gray-600 mt-1">Đánh giá</Box>
          </Box>
          <Box className="stats-card from-blue-50 to-white">
            <Box className="text-2xl font-bold text-blue-600">{stats.verified}</Box>
            <Box className="text-xs text-gray-600 mt-1">Xác thực</Box>
          </Box>
        </Box>

        {/* Search Section */}
        <Box className="card">
          <h3 className="card-header">Tìm kiếm shop</h3>
          
          {/* Search Type Selector */}
          <Box className="flex gap-2 mb-3">
            {[
              { value: 'phone' as SearchType, label: 'SĐT', iconName: 'zi-call' },
              { value: 'name' as SearchType, label: 'Tên', iconName: 'zi-shop' },
              { value: 'link' as SearchType, label: 'Link', iconName: 'zi-link' }
            ].map((type) => (
              <Button
                key={type.value}
                onClick={() => setSearchType(type.value)}
                size="small"
                variant={searchType === type.value ? 'primary' : 'secondary'}
                icon={<Icon icon={type.iconName} />}
                fullWidth
              >
                {type.label}
              </Button>
            ))}
          </Box>

          {/* Search Input */}
          <Box className="flex gap-2 items-center">
            <Box className="flex-1">
              <Input
                type="text"
                placeholder={
                  searchType === 'phone' ? 'Nhập số điện thoại...' :
                  searchType === 'name' ? 'Nhập tên shop...' :
                  'Nhập link shop...'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e: any) => e.key === 'Enter' && handleSearch()}
              />
            </Box>
            <Button
              onClick={handleSearch}
              variant="primary"
              icon={<Icon icon="zi-search" />}
              loading={searching}
              disabled={!query.trim()}
            />
          </Box>
        </Box>

        {/* Search Results */}
        {searching && <LoadingSpinner />}
        
        {!searching && hasSearched && results.length === 0 && (
          <EmptyState
            icon="zi-info-circle"
            title="Không tìm thấy shop"
            description="Thử tìm kiếm với từ khóa khác"
          />
        )}

        {!searching && results.length > 0 && (
          <Box className="space-y-3">
            <h3 className="card-header">
              Kết quả ({results.length})
            </h3>
            {results.map((shop) => {
              const scoreLevel = getTrustScoreLevel(shop.trustScore);
              return (
                <Box
                  key={shop.id}
                  onClick={() => handleShopClick(shop)}
                  className="card cursor-pointer hover:shadow-md transition-all fade-in"
                >
                  <Box className="flex items-start gap-3">
                    <Icon icon={getPlatformIconName(shop.platform)} size={32} />
                    <Box className="flex-1 min-w-0">
                      <Box className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{shop.name}</h3>
                        {shop.verified && (
                          <Box className="badge-verified">
                            <Icon icon="zi-verified" size={14} />
                          </Box>
                        )}
                      </Box>
                      {shop.phone && (
                        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                          <Icon icon="zi-call" size={14} />
                          {shop.phone}
                        </p>
                      )}
                      <Box className="flex items-center gap-3">
                        <Box className={`text-2xl font-bold score-${scoreLevel}`}>
                          {shop.trustScore}
                        </Box>
                        <Box className="flex-1">
                          <Box className="text-xs text-gray-500 mb-1">
                            {shop.totalReviews} đánh giá
                          </Box>
                          <Box className="w-full bg-gray-200 rounded-full h-1.5">
                            <Box
                              className={`h-1.5 rounded-full progress-bar-${scoreLevel}`}
                              style={{ width: `${shop.trustScore}%` }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Featured Shops - Only show when no search */}
        {!hasSearched && featuredShops.length > 0 && (
          <Box className="space-y-3">
            <Box className="flex items-center gap-2">
              <Icon icon="zi-star-solid" className="text-yellow-500" />
              <h3 className="font-semibold text-gray-900">Shop uy tín nhất</h3>
            </Box>
            {featuredShops.map((shop) => (
              <Box
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className="card cursor-pointer hover:shadow-md transition-all fade-in bg-gradient-to-br from-yellow-50 to-white border-yellow-200"
              >
                <Box className="flex items-start gap-3">
                  <Icon icon={getPlatformIconName(shop.platform)} size={32} className="text-yellow-600" />
                  <Box className="flex-1">
                    <Box className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{shop.name}</h3>
                      {shop.verified && (
                        <Box className="badge-verified">
                          <Icon icon="zi-verified" size={14} />
                        </Box>
                      )}
                    </Box>
                    <Box className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-bold text-green-600">{shop.trustScore}/100</span>
                      <span>•</span>
                      <span>{shop.totalReviews} đánh giá</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Page>
  );
};

export default SearchPage;

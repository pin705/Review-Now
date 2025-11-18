import React, { useState, useEffect } from 'react';
import { Page, Header, Input, Button, Icon, Box, Text } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { shopService } from '../services/shop.service';
import { SearchType, Shop } from '../types';
import { Section } from '../components/section';
import { Divider } from '../components/divider';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPlatformIconName, getTrustScoreLevel } from '../utils/helpers';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>('phone');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Shop[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
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
      const result = await shopService.searchShops(query, searchType, 1, 10);
      setResults(result.shops);
      setPage(1);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const loadMore = async () => {
    const next = page + 1;
    setLoadingMore(true);
    try {
      const result = await shopService.searchShops(query, searchType, next, 10);
      setResults((prev) => [...prev, ...(result.shops || [])]);
      setPage(next);
      setHasMore(result.hasMore);
    } catch (e) {
      console.error('Load more error:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleShopClick = (shop: Shop) => {
    navigate(`/shop/${shop.id}`);
  };

  return (
    <Page className="bg-background">
      <Header title="Tìm kiếm" showBackIcon={false} />

      <Box className="space-y-4">
        {/* Stats Cards */}
        <Box className="grid grid-cols-3 gap-3 px-4">
          <Box className="stats-card" style={{ '--from-color': '#fef3c7' } as any}>
            <Text size="xLarge" className="font-bold text-[#eab308]">
              {stats.totalShops}
            </Text>
            <Text size="xxSmall" className="text-gray mt-1">
              Shops
            </Text>
          </Box>
          <Box className="stats-card" style={{ '--from-color': '#dcfce7' } as any}>
            <Text size="xLarge" className="font-bold text-green-600">
              {stats.totalReviews}
            </Text>
            <Text size="xxSmall" className="text-gray mt-1">
              Đánh giá
            </Text>
          </Box>
          <Box className="stats-card" style={{ '--from-color': '#dbeafe' } as any}>
            <Text size="xLarge" className="font-bold text-blue-600">
              {stats.verified}
            </Text>
            <Text size="xxSmall" className="text-gray mt-1">
              Xác thực
            </Text>
          </Box>
        </Box>

        {/* Search Section */}
        <Section title="Tìm kiếm shop" padding="all">
          {/* Search Type Selector */}
          <Box className="flex gap-2 mb-3">
            {[
              { value: 'phone' as SearchType, label: 'SĐT', iconName: 'zi-call' },
              { value: 'name' as SearchType, label: 'Tên', iconName: 'zi-more-grid' },
              { value: 'link' as SearchType, label: 'Link', iconName: 'zi-link' }
            ].map((type) => (
              <Button
                key={type.value}
                onClick={() => setSearchType(type.value)}
                size="small"
                variant={searchType === type.value ? 'primary' : 'secondary'}
                icon={<Icon icon={type.iconName as any} />}
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
        </Section>

        {/* Search Results */}
        {searching && <LoadingSpinner />}
        
        {!searching && hasSearched && results.length === 0 && (
          <Box className="space-y-3">
            <EmptyState
              icon="zi-info-circle"
              title="Không tìm thấy shop"
              description="Chưa có ai đánh giá shop này"
            />
            <Box className="card bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
              <Box className="text-center space-y-3">
                <Icon icon="zi-plus-circle" size={48} className="text-yellow-600" />
                <Box>
                  <Text className="font-semibold text-gray-900 mb-1">
                    Bạn đã mua hàng ở shop này?
                  </Text>
                  <Text size="xSmall" className="text-gray">
                    Hãy là người đầu tiên đánh giá để giúp cộng đồng
                  </Text>
                </Box>
                <Button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (searchType === 'phone') params.set('phone', query);
                    if (searchType === 'link') params.set('link', query);
                    navigate(`/add-shop?${params.toString()}`);
                  }}
                  variant="primary"
                  size="medium"
                  icon={<Icon icon="zi-plus-circle-solid" />}
                >
                  Thêm shop này
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {!searching && results.length > 0 && (
          <Section title={`Kết quả (${results.length})`} padding="all">
            <Box className="space-y-3">
            {results.map((shop) => {
              const scoreLevel = getTrustScoreLevel(shop.trustScore);
              return (
                <Box
                  key={shop.id}
                  onClick={() => handleShopClick(shop)}
                  className="card cursor-pointer hover:shadow-md transition-all fade-in"
                >
                  <Box className="flex items-start gap-3">
                    {/* Shop Thumbnail */}
                    {shop.images && shop.images.length > 0 ? (
                      <Box className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={shop.images[0]} 
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      </Box>
                    ) : (
                      <Box className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center flex-shrink-0">
                        <Icon icon={getPlatformIconName(shop.platform) as any} size={28} className="text-yellow-300" />
                      </Box>
                    )}
                    <Box className="flex-1 min-w-0">
                      <Box className="flex items-start justify-between gap-2 mb-2">
                        <Text className="font-semibold text-gray-900">{shop.name}</Text>
                      </Box>
                      <Box className="flex flex-wrap gap-2 mb-2">
                        <Box className="badge badge-platform">
                          <Icon icon={getPlatformIconName(shop.platform) as any} size={14} />
                          {shop.platform}
                        </Box>
                        {shop.verified && (
                          <Box className="badge badge-verified">
                            <Icon icon="zi-check-circle-solid" size={14} />
                            Đã xác thực
                          </Box>
                        )}
                      </Box>
                      {shop.phone && (
                        <Text size="xSmall" className="text-gray mb-3 flex items-center gap-1">
                          <Icon icon="zi-call" size={14} />
                          {shop.phone}
                        </Text>
                      )}
                      <Box className="flex items-center gap-3">
                        <Text size="xLarge" className={`font-bold score-${scoreLevel}`}>
                          {shop.trustScore}
                        </Text>
                        <Box className="flex-1">
                          <Text size="xxSmall" className="text-gray mb-1">
                            {shop.totalReviews} đánh giá
                          </Text>
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
            {hasMore && (
              <Box className="mt-3">
                <Button
                  onClick={loadMore}
                  loading={loadingMore}
                  variant="tertiary"
                  fullWidth
                >
                  Tải thêm
                </Button>
              </Box>
            )}
          </Section>
        )}
        {/* Featured Shops - Only show when no search */}
        {!hasSearched && featuredShops.length > 0 && (
          <Section title="Shop uy tín nhất" padding="all">
            <Box className="space-y-3">
              {featuredShops.map((shop) => (
                <Box
                  key={shop.id}
                  onClick={() => handleShopClick(shop)}
                  className="card cursor-pointer hover:shadow-md transition-all fade-in bg-gradient-to-br from-yellow-50 to-white border-yellow-200"
                >
                  <Box className="flex items-start gap-3">
                    <Icon icon={getPlatformIconName(shop.platform) as any} size={32} className="text-yellow-600" />
                    <Box className="flex-1">
                      <Box className="flex items-center justify-between mb-2">
                        <Text className="font-semibold text-gray-900">{shop.name}</Text>
                        {shop.verified && (
                          <Box className="text-blue-500">
                            <Icon icon="zi-check-circle-solid" size={14} />
                          </Box>
                        )}
                      </Box>
                      <Box className="flex items-center gap-2">
                        <Text size="xSmall" className="font-bold text-green-600">
                          {shop.trustScore}/100
                        </Text>
                        <Text size="xSmall" className="text-gray">•</Text>
                        <Text size="xSmall" className="text-gray">
                          {shop.totalReviews} đánh giá
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Section>
        )}
      </Box>
    </Page>
  );
};

export default SearchPage;

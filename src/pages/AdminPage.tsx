import React, { useState, useEffect } from 'react';
import { Page, Header, Box, Text, Button, Icon, Tabs, Modal, useSnackbar } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { Shop, Review, Report } from '../types';
import { shopService } from '../services/shop.service';
import { formatDate, formatPhone, getPlatformIconName } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [activeTab, setActiveTab] = useState('reports');
  const [loading, setLoading] = useState(true);

  // Reports
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Shops
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showShopModal, setShowShopModal] = useState(false);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [moderationReviews, setModerationReviews] = useState<Review[]>([]);

  // Stats
  const [stats, setStats] = useState({
    totalShops: 0,
    totalReviews: 0,
    pendingReports: 0,
    needsModeration: 0
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'reports') {
        await loadReports();
      } else if (activeTab === 'shops') {
        await loadShops();
      } else if (activeTab === 'reviews') {
        await loadReviews();
      } else if (activeTab === 'stats') {
        await loadStats();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    const data = await shopService.getAllReports();
    setReports(data);
  };

  const loadShops = async () => {
    const data = await shopService.getAllShops();
    setShops(data);
  };

  const loadReviews = async () => {
    const data = await shopService.getAllReviews();
    setReviews(data);
    setModerationReviews(data.filter(r => r.needsModeration));
  };

  const loadStats = async () => {
    const allShops = await shopService.getAllShops();
    const allReviews = await shopService.getAllReviews();
    const allReports = await shopService.getAllReports();
    
    setStats({
      totalShops: allShops.length,
      totalReviews: allReviews.length,
      pendingReports: allReports.filter(r => r.status === 'pending').length,
      needsModeration: allReviews.filter(r => r.needsModeration).length
    });
  };

  const handleApproveReport = async (reportId: string) => {
    try {
      await shopService.updateReportStatus(reportId, 'verified');
      snackbar.openSnackbar({
        text: 'Đã duyệt báo cáo',
        type: 'success'
      });
      loadReports();
      setShowReportModal(false);
    } catch (error) {
      snackbar.openSnackbar({
        text: 'Có lỗi xảy ra',
        type: 'error'
      });
    }
  };

  const handleRejectReport = async (reportId: string) => {
    try {
      await shopService.updateReportStatus(reportId, 'rejected');
      snackbar.openSnackbar({
        text: 'Đã từ chối báo cáo',
        type: 'success'
      });
      loadReports();
      setShowReportModal(false);
    } catch (error) {
      snackbar.openSnackbar({
        text: 'Có lỗi xảy ra',
        type: 'error'
      });
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    if (!confirm('Bạn có chắc muốn xóa shop này?')) return;
    
    try {
      await shopService.deleteShop(shopId);
      snackbar.openSnackbar({
        text: 'Đã xóa shop',
        type: 'success'
      });
      loadShops();
      setShowShopModal(false);
    } catch (error) {
      snackbar.openSnackbar({
        text: 'Có lỗi xảy ra',
        type: 'error'
      });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Bạn có chắc muốn xóa review này?')) return;
    
    try {
      await shopService.deleteReview(reviewId);
      snackbar.openSnackbar({
        text: 'Đã xóa review',
        type: 'success'
      });
      loadReviews();
    } catch (error) {
      snackbar.openSnackbar({
        text: 'Có lỗi xảy ra',
        type: 'error'
      });
    }
  };

  const handleApproveReview = async (reviewId: string) => {
    try {
      await shopService.approveReview(reviewId);
      snackbar.openSnackbar({
        text: 'Đã duyệt review',
        type: 'success'
      });
      loadReviews();
    } catch (error) {
      snackbar.openSnackbar({
        text: 'Có lỗi xảy ra',
        type: 'error'
      });
    }
  };

  return (
    <Page className="bg-background">
      <Header title="Quản trị" showBackIcon={false} />

      <Box className="p-4">
        {/* Quick Stats */}
        <Box className="grid grid-cols-2 gap-3 mb-4">
          <Box className="card text-center">
            <Text size="xLarge" className="font-bold text-blue-600">{stats.totalShops}</Text>
            <Text size="xSmall" className="text-gray">Tổng Shops</Text>
          </Box>
          <Box className="card text-center">
            <Text size="xLarge" className="font-bold text-green-600">{stats.totalReviews}</Text>
            <Text size="xSmall" className="text-gray">Tổng Reviews</Text>
          </Box>
          <Box className="card text-center">
            <Text size="xLarge" className="font-bold text-orange-600">{stats.pendingReports}</Text>
            <Text size="xSmall" className="text-gray">Báo cáo chờ</Text>
          </Box>
          <Box className="card text-center">
            <Text size="xLarge" className="font-bold text-red-600">{stats.needsModeration}</Text>
            <Text size="xSmall" className="text-gray">Review chờ duyệt</Text>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.Tab key="reports" label="Báo cáo">
            {loading ? (
              <LoadingSpinner />
            ) : reports.length === 0 ? (
              <EmptyState icon="zi-check-circle" title="Không có báo cáo" />
            ) : (
              <Box className="space-y-3 mt-4">
                {reports.map((report) => (
                  <Box
                    key={report.id}
                    className="card cursor-pointer hover:shadow-md transition-all"
                    onClick={() => {
                      setSelectedReport(report);
                      setShowReportModal(true);
                    }}
                  >
                    <Box className="flex items-start justify-between mb-2">
                      <Box className="flex-1">
                        <Text className="font-semibold">{report.userName}</Text>
                        <Text size="xSmall" className="text-gray">
                          {formatDate(report.createdAt)}
                        </Text>
                      </Box>
                      <Box className={`badge ${
                        report.status === 'pending' ? 'badge-yellow' :
                        report.status === 'verified' ? 'badge-platform' : '!bg-gray-400'
                      }`}>
                        {report.status === 'pending' ? 'Chờ duyệt' :
                         report.status === 'verified' ? 'Đã duyệt' : 'Đã từ chối'}
                      </Box>
                    </Box>
                    <Box className="mb-2">
                      <span className="text-sm font-medium">Lý do: </span>
                      <span className="text-sm text-gray-700">
                        {report.reason === 'duplicate-shop' ? 'Shop trùng lặp' :
                         report.reason === 'wrong-info' ? 'Thông tin sai' :
                         report.reason === 'scam' ? 'Lừa đảo' : report.reason}
                      </span>
                    </Box>
                    <Text size="small" className="text-gray-600 line-clamp-2">
                      {report.content}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Tabs.Tab>

          <Tabs.Tab key="shops" label="Shops">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Box className="space-y-3 mt-4">
                {shops.map((shop) => (
                  <Box
                    key={shop.id}
                    className="card cursor-pointer hover:shadow-md transition-all"
                    onClick={() => {
                      setSelectedShop(shop);
                      setShowShopModal(true);
                    }}
                  >
                    <Box className="flex items-start gap-3">
                      <Icon icon={getPlatformIconName(shop.platform) as any} size={32} />
                      <Box className="flex-1">
                        <Text className="font-semibold">{shop.name}</Text>
                        <Text size="xSmall" className="text-gray">{formatPhone(shop.phone)}</Text>
                        <Box className="flex gap-2 mt-2">
                          <span className="badge badge-platform">{shop.platform}</span>
                          {shop.needsModeration && (
                            <span className="badge badge-yellow">Cần kiểm duyệt</span>
                          )}
                        </Box>
                      </Box>
                      <Box className="text-right">
                        <Text size="large" className="font-bold text-yellow-600">
                          {shop.trustScore}
                        </Text>
                        <Text size="xSmall" className="text-gray">
                          {shop.totalReviews} review
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Tabs.Tab>

          <Tabs.Tab key="reviews" label="Reviews">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Box className="mt-4">
                {/* Reviews cần duyệt */}
                {moderationReviews.length > 0 && (
                  <Box className="mb-4">
                    <Text className="font-semibold mb-3 text-orange-600">
                      Cần kiểm duyệt ({moderationReviews.length})
                    </Text>
                    <Box className="space-y-3">
                      {moderationReviews.map((review) => (
                        <Box key={review.id} className="card bg-orange-50 border-orange-200">
                          <Box className="flex justify-between items-start mb-2">
                            <Box>
                              <Text className="font-semibold">{review.userName}</Text>
                              <Text size="xSmall" className="text-gray">
                                {formatDate(review.createdAt)}
                              </Text>
                            </Box>
                            {review.isFirstReview && (
                              <span className="badge badge-yellow">Review đầu tiên</span>
                            )}
                          </Box>
                          <Text size="small" className="text-gray-700 mb-3">
                            {review.content}
                          </Text>
                          <Box className="flex gap-2">
                            <Button
                              size="small"
                              variant="primary"
                              onClick={() => handleApproveReview(review.id)}
                            >
                              Duyệt
                            </Button>
                            <Button
                              size="small"
                              variant="secondary"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              Xóa
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Tất cả reviews */}
                <Text className="font-semibold mb-3">Tất cả Reviews</Text>
                <Box className="space-y-3">
                  {reviews.slice(0, 20).map((review) => (
                    <Box key={review.id} className="card">
                      <Box className="flex justify-between items-start mb-2">
                        <Box>
                          <Text className="font-semibold">{review.userName}</Text>
                          <Text size="xSmall" className="text-gray">
                            Rating: {review.rating}★ | {formatDate(review.createdAt)}
                          </Text>
                        </Box>
                        <Button
                          size="small"
                          variant="tertiary"
                          icon={<Icon icon="zi-close" />}
                          onClick={() => handleDeleteReview(review.id)}
                        />
                      </Box>
                      <Text size="small" className="text-gray-700">
                        {review.content}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Tabs.Tab>
        </Tabs>
      </Box>

      {/* Report Detail Modal */}
      <Modal
        visible={showReportModal}
        title="Chi tiết báo cáo"
        onClose={() => setShowReportModal(false)}
      >
        {selectedReport && (
          <Box className="p-4 space-y-4">
            <Box>
              <Text className="font-semibold mb-1">Người báo cáo:</Text>
              <Text>{selectedReport.userName}</Text>
              <Text size="xSmall" className="text-gray">{formatDate(selectedReport.createdAt)}</Text>
            </Box>
            
            <Box>
              <Text className="font-semibold mb-1">Lý do:</Text>
              <Text>
                {selectedReport.reason === 'duplicate-shop' ? 'Shop trùng lặp' :
                 selectedReport.reason === 'wrong-info' ? 'Thông tin sai' :
                 selectedReport.reason === 'scam' ? 'Lừa đảo' : selectedReport.reason}
              </Text>
            </Box>
            
            <Box>
              <Text className="font-semibold mb-1">Nội dung:</Text>
              <Text>{selectedReport.content}</Text>
            </Box>

            {selectedReport.status === 'pending' && (
              <Box className="flex gap-3 pt-4 border-t">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleApproveReport(selectedReport.id)}
                >
                  Duyệt báo cáo
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => handleRejectReport(selectedReport.id)}
                >
                  Từ chối
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Modal>

      {/* Shop Detail Modal */}
      <Modal
        visible={showShopModal}
        title="Chi tiết Shop"
        onClose={() => setShowShopModal(false)}
      >
        {selectedShop && (
          <Box className="p-4 space-y-4">
            <Box>
              <Text className="font-semibold mb-1">Tên shop:</Text>
              <Text>{selectedShop.name}</Text>
            </Box>
            
            <Box>
              <Text className="font-semibold mb-1">Số điện thoại:</Text>
              <Text>{formatPhone(selectedShop.phone)}</Text>
            </Box>
            
            <Box>
              <Text className="font-semibold mb-1">Platform:</Text>
              <Text>{selectedShop.platform}</Text>
            </Box>

            <Box>
              <Text className="font-semibold mb-1">Trust Score:</Text>
              <Text className="text-xl font-bold text-yellow-600">{selectedShop.trustScore}</Text>
              <Text size="xSmall" className="text-gray">
                {selectedShop.totalReviews} đánh giá ({selectedShop.positiveReviews} tích cực, {selectedShop.negativeReviews} tiêu cực)
              </Text>
            </Box>

            <Box className="flex gap-3 pt-4 border-t">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setShowShopModal(false);
                  navigate(`/shop/${selectedShop.id}`);
                }}
              >
                Xem chi tiết
              </Button>
              <Button
                variant="secondary"
                fullWidth
                className="!bg-red-500 !text-white"
                onClick={() => handleDeleteShop(selectedShop.id)}
              >
                Xóa Shop
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </Page>
  );
};

export default AdminPage;

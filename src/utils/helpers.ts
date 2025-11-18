export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
  return `${Math.floor(diffDays / 365)} năm trước`;
};

export const formatPhone = (phone: string): string => {
  // Format: 0901234567 -> 090 123 4567
  if (phone.length === 10) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
  }
  return phone;
};

export const getTrustScoreLevel = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

export const getTrustScoreLabel = (score: number): string => {
  if (score >= 90) return 'Rất uy tín';
  if (score >= 70) return 'Uy tín';
  if (score >= 50) return 'Trung bình';
  if (score >= 30) return 'Cẩn thận';
  return 'Không uy tín';
};

// Return Zalo UI icon name for a given platform
export const getPlatformIconName = (platform: string): string => {
  const icons: Record<string, string> = {
    facebook: 'zi-facebook',
    shopee: 'zi-shopping-bag',
    lazada: 'zi-shopping-cart',
    tiktok: 'zi-video',
    zalo: 'zi-zalo',
    other: 'zi-shop'
  };
  return icons[platform] || icons.other;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

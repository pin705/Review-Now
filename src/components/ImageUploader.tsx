import React, { useState } from 'react';
import { Box, Button, Icon, Text } from 'zmp-ui';
import { shopService } from '../services/shop.service';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onImagesChange,
  maxImages = 5,
  folder = 'review-now'
}) => {
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    if (images.length + files.length > maxImages) {
      alert(`Chỉ được tải tối đa ${maxImages} ảnh`);
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Chỉ chấp nhận file ảnh');
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Kích thước ảnh tối đa 5MB');
          continue;
        }

        // Convert to base64
        const base64 = await fileToBase64(file);
        
        // Upload to Cloudinary
        const url = await shopService.uploadImage(base64, folder);
        uploadedUrls.push(url);
      }

      onImagesChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Lỗi khi tải ảnh lên. Vui lòng thử lại!');
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Box>
      {/* Image previews */}
      {images.length > 0 && (
        <Box className="grid grid-cols-3 gap-2 mb-3">
          {images.map((url, index) => (
            <Box key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={url} 
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Icon icon="zi-close" size={14} />
              </button>
            </Box>
          ))}
        </Box>
      )}

      {/* Upload button */}
      {images.length < maxImages && (
        <Box>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
            disabled={uploading}
          />
          <label htmlFor="image-upload" className="block">
            <Box
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-all"
            >
              <Icon icon={(uploading ? "zi-refresh" : "zi-add-photo") as any} size={24} className={uploading ? "animate-spin text-yellow-600" : "text-gray-600"} />
              <Text size="small" className="font-medium text-gray-900 mt-1">
                {uploading ? 'Đang tải ảnh...' : `Thêm ảnh (${images.length}/${maxImages})`}
              </Text>
            </Box>
          </label>
          <Text size="xxSmall" className="text-gray text-center mt-2">
            Tùy chọn • Tối đa {maxImages} ảnh, mỗi ảnh tối đa 5MB
          </Text>
        </Box>
      )}
    </Box>
  );
};

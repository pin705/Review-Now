import { atom } from 'recoil';
import { Shop } from '../types';

export const currentShopState = atom<Shop | null>({
  key: 'currentShop',
  default: null
});

export const searchHistoryState = atom<string[]>({
  key: 'searchHistory',
  default: []
});

export const userState = atom({
  key: 'user',
  default: {
    id: '',
    name: '',
    phone: ''
  }
});

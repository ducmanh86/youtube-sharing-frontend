import axiosClient from './axios_client';
import {User} from "./auth.api";

export type ListingDTO = {
  page: number;
  limit: number;
};

export type SharingDTO = {
  videoUrl: string;
};

export type Video = {
  id: number;
  videoId: string;
  shareBy: User;
  url: string;
  title?: string;
  channel?: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
};

export const listing = (params: ListingDTO) => {
  return axiosClient.get('videos', { params});
};

export const share = (data: SharingDTO) => {
  return axiosClient.post('videos', data);
};

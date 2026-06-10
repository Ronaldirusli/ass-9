import axios from 'axios';

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

export const axiosInstance = api;

export const getPosterURL = (path: string | null) => {
  return path
    ? `${IMAGE_BASE_URL}/w500${path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
};

export const getBackdropURL = (path: string | null) => {
  return path
    ? `${IMAGE_BASE_URL}/original${path}`
    : 'https://via.placeholder.com/1280x720?text=No+Background';
};

export default api;

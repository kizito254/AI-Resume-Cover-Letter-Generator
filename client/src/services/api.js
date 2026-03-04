import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

export const generateResume = async (payload) => {
  const { data } = await api.post('/generate/resume', payload);
  return data;
};

export const generateCoverLetter = async (payload) => {
  const { data } = await api.post('/generate/cover-letter', payload);
  return data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const { data } = await api.post('/upload/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

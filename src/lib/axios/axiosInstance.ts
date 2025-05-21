import axios from 'axios';

export function createAuthenticatedInstance(
  baseUrl: string,
  tokenProvider: () => Promise<string>,
) {
  const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
  });
  axiosInstance.interceptors.request.use(async function (config) {
    const token = await tokenProvider();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return axiosInstance;
}

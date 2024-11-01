import axios from "axios";
import { Cookies } from "react-cookie";
import { authorizedURLs } from "../../constants";

export const axiosPublicClient = axios.create({});

const baseURL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export const axiosPrivateClient = axios.create({
  headers: {
    responseType: "json",
  },
});

axiosPublicClient.interceptors.response.use((config) => {
  if (config.status === 200) {
    window.localStorage.setItem('last-health-check', 'ok')
  }
  return config
})
const cookies = new Cookies();

const tryTokenRefresh = async (errorTry = 3) => {
  // TODO: Refresh token
}

axiosPrivateClient.interceptors.response.use((response) => response, async (error) => {
  const authenticationError = error.response.status === 401 || error.response.status === 403;

  if (authenticationError) {
    // Refresh token or redirect to login
    if (authorizedURLs.includes(error.response.config.url as typeof authorizedURLs[number])) {
      // TODO: attempt to refresh token
      try {
        await tryTokenRefresh();
        const ACCESS_TOKEN = cookies.get("accessToken");
        error.response.config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
        return axiosPrivateClient(error.response.config);
      } catch (error) {
        // Redirect to login
        window.location.href = "/login";
      }
    } else {
      // Redirect to login
      window.location.href = "/login";
    }
  }
})

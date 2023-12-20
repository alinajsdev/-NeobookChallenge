import axios from "axios";

axios.defaults.baseURL = "https://neobook.online/mobi-market/";

const refresh = localStorage.getItem("refreshToken");

async function refreshAuthToken() {
  try {
    const response = await axios.post("users/login/refresh/", refresh);
  
    if (response.status === 200) {
   
      const newToken = response.data["token"];
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return true;

    }
  } catch (error) {
    console.error("Failed to refresh auth token:", error);
    return false;
  }
}

// Интерцептор для обработки ошибок и автоматического обновления токена
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const tokenRefreshed = await refreshAuthToken();
      if (tokenRefreshed) {
        // Повторяем оригинальный запрос с обновленным токеном
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

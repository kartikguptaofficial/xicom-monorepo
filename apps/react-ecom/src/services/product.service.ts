import axios from "axios"
import { APP_CONFIG } from "../config/app.config"

const fetchProducts = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(`${APP_CONFIG.API_BASE_URL}/v1/product`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  console.log({ response })
  return response.data?.data;
}

export {
  fetchProducts
}
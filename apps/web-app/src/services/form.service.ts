import axios from "axios"
import { APP_CONFIG } from "../config/app.config"

const storeUserDetails = async (payload: any) => {
    const response = await axios.post(`${APP_CONFIG.API_BASE_URL}/v1/user`, payload);
    return response.data;
}

export {
    storeUserDetails
}
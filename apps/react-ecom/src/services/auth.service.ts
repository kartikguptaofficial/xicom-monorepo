import axios from "axios"
import { APP_CONFIG } from "../config/app.config"

const loginUserController = async (payload: any) => {
    const response = await axios.post(`${APP_CONFIG.API_BASE_URL}/v1/auth/login`, payload)
        .catch((err) => {
            console.log({ err })
            return err?.response?.data;
        })
    console.log({ response })
    return response?.data ?? response;
}

const registerUserController = async (payload: any) => {
    const response = await axios.post(`${APP_CONFIG.API_BASE_URL}/v1/auth/register`, payload)
        .catch((err) => {
            console.log({ err })
            return err?.response?.data;
        })
    console.log({ response })
    return response?.data ?? response;
}

export {
    loginUserController,
    registerUserController
}
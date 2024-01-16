import axios from "axios";
import { useAuthStore } from "../stores";

let authData = useAuthStore.getState()

const apiRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authData.accessToken?.access_token || ''}`,
        Auth: `${authData.sessionToken.token || ''}`,
        Sid: `${authData.sessionToken.sid || ''}`,
    },
});

export default apiRequest
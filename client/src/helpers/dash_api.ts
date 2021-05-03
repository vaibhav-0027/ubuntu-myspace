import axios from "axios";
import { getUserAccessId, getUserAccessToken } from "./authentication";


const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}
const LOCAL_SERVER_URL = "http://localhost:8080";

const dash_api = axios.create({
    baseURL: `${LOCAL_SERVER_URL}/api`,
    ...defaultHeaders,
});


dash_api.interceptors.request.use(
    (config: any) => {
        const token = getUserAccessToken();
        const id = getUserAccessId();

        if(token) {
            config.headers = {
                ...config.headers,
                'jwt_token': token,
                'user_id': id,
            };
        }

        return config;
    },
    (err: any) => {
        return Promise.reject(err);
    }
);

export default dash_api;
import axios from "axios";
import { API_URL } from "@/common/config/config.js";
import JwtService from "@/common/services/jwt.service.js";

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL;

        // Request interceptor to add JWT token to headers
        axios.interceptors.request.use(config => {
                const token = JwtService.getToken();
                if (token)
                    config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
    },

    query(resource, params) {
        return axios.get(resource, params).catch(error => {
            throw new Error(`[API] ApiService ${error}`);
        });
    },

    get(resource, slug = "") {
        return axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[API] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return axios.post(`${resource}`, params);
    },

    update(resource, slug, params) {
        return axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return axios.put(`${resource}`, params);
    },

    delete(resource) {
        return axios.delete(resource).catch(error => {
            throw new Error(`[API] ApiService ${error}`);
        });
    }
};

export default ApiService;
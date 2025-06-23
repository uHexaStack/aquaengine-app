import axios from "axios";
import {API_URL} from "@/common/config/config.js";
import { getToken } from "@features/auth/infrastructure/services/jwt.service.js";

const ApiService = {
    init() {
        axios.defaults.baseURL = API_URL;

        // Request interceptor to add JWT token to headers
        axios.interceptors.request.use(config => {
                const token = getToken();
                if (token)
                    config.headers.Authorization = `Bearer ${getToken()}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Token ${getToken()}`;
    },

    clearHeader() {
        delete axios.defaults.headers.common["Authorization"];
    },

    query(resource, params) {
        return axios.get(resource, params).catch(error => {
            throw new Error(`[API] ApiService ${error}`);
        });
    },

    get(resource, slug = "") {
        const url = slug ? `${resource}/${slug}` : resource;
        return axios.get(url);
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
import axios from "axios";


const BASE_URL = "http://192.168.1.83:8082";


const httpRequest = axios.create({
    baseURL: `${BASE_URL}`,
});

export const get = async (path, config = {}) => {
    const response = await httpRequest.get(path, config);
    return response.data;
};

export const post = async (path, data, config = {}) => {
    const response = await httpRequest.post(path, data, config);
    return response.data;
};

export const put = async (path, data, config = {}) => {
    const response = await httpRequest.put(path, data, config);
    return response.data;
};

export const del = async (path, config = {}) => {
    const response = await httpRequest.delete(path, config);
    return response.data;
};

export const patch = async (path, data, config = {}) => {
    const response = await httpRequest.patch(path, data, config);
    return response.data;
};

export default httpRequest;

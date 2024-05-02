import axios from "axios";

const BASE_URL = "http://192.168.1.3:8082";

const httpRequest = axios.create({
    baseURL: `${BASE_URL}`,
});

export const get = async (path, config = {}) => {
    // console.log(
    //     "Start get at url ",
    //     httpRequest.getUri() + path,
    //     " with data ",
    //     options
    // );

    const response = await httpRequest.get(path, config);
    return response.data;
};

export const post = async (path, data, config = {}) => {
    // console.log(
    //     "Start post at url ",
    //     httpRequest.getUri() + path,
    //     " with data ",
    //     option
    // );
    const response = await httpRequest.post(path, data, config);
    return response.data;
};

export default httpRequest;

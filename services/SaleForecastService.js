import * as http from "../utils/httpRequest";

export const getAllSaleForecast = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await http.get("/api/sale_forecast", config);
        return res;
    } catch (e) {
        console.log("Error at Get sale forecast: ", e);
    }
};

export const addSaleForecast = async (token, accountant_id) => {
    console.log('Token:', token);
    console.log('Accountant_id:', accountant_id);
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        },
    };
    try {
        const res = await http.post(`/api/sale_forecast/create?ac_id=${accountant_id}`, null, { ...headers });
        return res;
    } catch (error) {
        if (error.response) {
            // Server responded with an error status code (4xx or 5xx)
            console.log("Error at Add sale forecast: ", error.response.status);
            console.log("Error response data: ", error.response);
        } else if (error.request) {
            // Request was made but no response was received
            console.log("No response received: ", error.request);
        } else {
            // Something else happened while setting up the request
            console.log("Error setting up request: ", error.message);
        }
    }
};
import * as http from "../utils/httpRequest";
import { format } from 'date-fns';

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
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: {
            ac_id: accountant_id,
        },
    };
    try {
        const res = await http.post(`/api/sale_forecast/create`, null, config);
        return res;
    } catch (e) {
        console.log("Error at Add sale forecast: ", e);
    }
};

export const deleteSaleForecast = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    try {
        const res = await http.del(`/api/sale_forecast/${id}`, config);
        return res;
    } catch (e) {
        console.log("Error at Delete sale forecast: ", e);
    }
};

export const updateSaleForecast = async (token, id, dateStart, dateEnd) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const data = {
        dateStart,
        dateEnd,
    }
    try {
        const res = await http.put(`/api/sale_forecast/${id}`, data, config);
        return res;
    } catch (e) {
        console.log("Error at Update sale forecast: ", e);
    }
};
import * as http from "../utils/httpRequest";

export const getSaleForecastDetail = async (token, sale_forecast_id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await http.get(`/api/sale_forecast_detail/${sale_forecast_id}`, config);
        return res;
    } catch (e) {
        console.log("Error at Get sale forecast detail: ", e);
    }
};

export const addSaleForecastDetail = async (token, sid, pids, quantities) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    };
    const data = {
        sid,
        pids,
        quantities,
    }
    try {
        const res = await http.post(`/api/sale_forecast_detail/create`, data, config);
        return res;
    } catch (e) {
        console.log("Error at Add sale forecast detail: ", e);
    }
};

export const deleteSaleForecastDetail = async (token, pid, sid) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: {
            pid: pid,
        },
    };
    try {
        const res = await http.del(`/api/sale_forecast_detail/${sid}`, config);
        return res;
    } catch (e) {
        console.log("Error at Delete sale forecast detail: ", e);
    }
};

export const updateSaleForecastDetail = async (token, sid, pid, updatedQuantity, updatedTotalPrice, updatedTotalSalePrice) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    const data = {
        sid,
        pid,
        updatedQuantity,
        updatedTotalPrice,
        updatedTotalSalePrice
    }
    console.log(sid);
    console.log(pid);
    console.log(updatedQuantity);
    console.log(updatedTotalPrice);
    console.log(updatedTotalSalePrice);
    try {
        const res = await http.put(`/api/sale_forecast_detail`, data, config);
        return res;
    } catch (e) {
        console.log("Error at Update sale forecast: ", e);
    }
};


export const getProductsForSaleForecast = async (token, sale_forecast_id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await http.get(`/api/products/forSaleDetail/${sale_forecast_id}`, config);
        return res;
    } catch (e) {
        console.log("Error at Get products: ", e);
    }
};
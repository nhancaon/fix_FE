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

// export const addSaleForecast = async (token, accountant_id) => {
//     const config = {
//         headers: {
//             Authorization: "Bearer " + token,
//         },
//         params: {
//             ac_id: accountant_id,
//         },
//     };
//     try {
//         const res = await http.post(`/api/sale_forecast/create`, null, config);
//         return res;
//     } catch (e) {
//         console.log("Error at Add sale forecast: ", e);
//     }
// };

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

// export const updateSaleForecast = async (token, id, dateStart, dateEnd) => {
//     const config = {
//         headers: {
//             Authorization: "Bearer " + token,
//         },
//     };
//     const data = {
//         dateStart,
//         dateEnd,
//     }
//     try {
//         const res = await http.put(`/api/sale_forecast/${id}`, data, config);
//         return res;
//     } catch (e) {
//         console.log("Error at Update sale forecast: ", e);
//     }
// };
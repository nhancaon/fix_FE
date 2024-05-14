import * as http from "../utils/httpRequest";

export const allSaleForecast = async (token, id) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    try {
        const res = await http.get(
            `/api/sale_forecast/create?ac_id=${id}`,
            config);
        return res;
    } catch (e) {
        console.log("Error at Get user information: ", e);
    }
};
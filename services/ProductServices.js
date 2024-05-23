import * as http from "../utils/httpRequest";

export const getAllProduct = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get("/api/products/all", config);
        return res;
    } catch (e) {
        console.log("Error at Product Service: ", e);
    }
}
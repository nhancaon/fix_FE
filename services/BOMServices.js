import * as http from "../utils/httpRequest";

export const getAllBOMs = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get("/api/BOMs/getAll", config);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
};
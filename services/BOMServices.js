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

export const getBOMlikeName = async (token, name) => {
    console.log("name: ", name);
    console.log("token 2 : ", token);
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const res = await http.get(`/api/BOMs/getBOMsByLikeName?nameRequest=${encodeURIComponent(name)}`, config);
        console.log("res: ", res);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
};

export const getBOMsByStatus = async (token, status) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get(`/api/BOMs/getAll/status?statusRequest=${encodeURIComponent(status)}`, config);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
};

export const getBOMDetail = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get(`/api/BOMs/getBOMById/${id}`, config);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
};

export const deleteBOM = async (token, bomID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.del(`/api/BOMs/delete/${bomID}`, config);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
}

export const updateBOM = async (token, bomID, data) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.put(`/api/BOMs/updateBOM/${bomID}`, data, config);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
}

export const createBOM = async (token, data) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.post("/api/BOMs/createBOMs", data, config);
        return res;
    } catch (e) {
        console.log("Error at BOM Service: ", e);
    }
}
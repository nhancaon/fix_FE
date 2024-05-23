import * as http from "../utils/httpRequest";

export const getAllMPS = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get("/api/MPS/getAll", config);
        return res;
    } catch (e) {
        console.log("Error at MPS Service: ", e);
    }
};

export const getAllMPSofPM = async (token, id) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get(`/api/MPS/getAllMPSofPM/${id}`, config);
        return res;
    } catch (e) {
        console.log("Error at MPS Service: ", e);
    }
}

export const getMPSByID = async (token, mpsID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get(`/api/MPS/getById/${mpsID}`, config);
        return res;
    } catch (e) {
        console.log("Error at MPS Service: ", e);
    }
}

export const createMPS = async (token, data) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.post("/api/MPS/createMPS", data, config);
        return res;
    } catch (e) {
        console.log("Error at MPS Service: ", e);
    }
};

export const updateMPS = async (token, data) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.put(`/api/MPS/updateMPS`, data, config);
        return res;
    } catch (e) {
        console.log("Error at MPS Service: ", e);
    }
}

export const deleteMPS = async (token, mpsID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.del(`/api/MPS/deleteMPS/${mpsID}`, config);
        return res;
    } catch (e) {
        console.log("Error at MPS Service: ", e);
    }
}

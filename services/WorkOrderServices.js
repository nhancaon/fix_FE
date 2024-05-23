import * as http from "../utils/httpRequest";

export const creatWorkOrder = async (token, req) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.post("/api/WorkOrder/createWorkOrder", req, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrder Service: ", e);
    }
}

export const updateWorkOrder = async (token, req) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.put("/api/WorkOrder/updateWorkOrder", req, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrder Service: ", e);
    }
}

export const deleteWorkOrder = async (token, workOrderID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.del(`/api/WorkOrder/deleteWorkOrder/${workOrderID}`, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrder Service: ", e);
    }
}

export const getAllWorkOrders = async (token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get("/api/WorkOrder/getAllWorkOrders", config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrder Service: ", e);
    }
}

export const getAllWorkOrdersOfPM = async (token, pmID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: { pmID }
        };
        const res = await http.get(`/api/WorkOrder/getAllWorkOrdersOfPM`, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrder Service: ", e);
    }
}

export const getWorkOrderDetail = async (token, workOrderID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get(`/api/WorkOrder/getDetailAboutWorkOrder/${workOrderID}`, config);
        return res;
    }
    catch (e) {
        console.log("Error at WorkOrder Service: ", e);
    }
}
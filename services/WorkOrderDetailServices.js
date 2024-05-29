import * as http from "../utils/httpRequest";

export const createWorkOrderDetail = async (token, req) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.post("/api/WorkOrderDetail/createWorkOrderDetail", req, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrderDetail Service: ", e);
    }
}

export const updateWorkOrderDetail = async (token, req) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.put("/api/WorkOrderDetail/updateWorkOrderDetail", req, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrderDetail Service: ", e);
    }
}

export const sumProjectedProductionByMPS = async (token, idmps) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await http.get(`/api/WorkOrderDetail/sumProjectedProductionByMasterProductionSchedule/${idmps}`, config);
        return res;
    } catch (e) {
        console.log("Error at WorkOrderDetail Service: ", e);
    }
}

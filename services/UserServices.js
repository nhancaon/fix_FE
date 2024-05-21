import * as http from "../utils/httpRequest";

export const updateUser = async (id, fullName, email, dateOfBirth, phoneNumber, address) => {
    try {
        const res = await http.put(
            "/api/users/"+id,
            {
                fullName,
                email,
                dateOfBirth,
                phoneNumber,
                address
            },
        );
        return res;
    } catch (e) {
        console.log("Error at User Service: ", e);
    }
};

export const updateUserByChairman = async (id, fullName, email, dateOfBirth, phoneNumber, address, roleName) => {
    try {
        const res = await http.put(
            "/api/users/"+id,
            {
                fullName,
                email,
                dateOfBirth,
                phoneNumber,
                address,
                roleName
            },
        );
        return res;
    } catch (e) {
        console.log("Error at User Service: ", e);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await http.del(
            "/api/users/"+id
        );
        return res;
    } catch (e) {
        console.log("Error at deleteUser in User Service: ", e);
    }
};

export const resetPassword = async (id, password) => {
    try {
        const res = await http.put(
            "/api/users/reset/"+id,
            {
                password
            },
        );
        return res;
    } catch (e) {
        console.log("Error at Reset Password: ", e);
    }
};

export const getSignUpRequest = async (id) => {
    try {
        const res = await http.get(
            "/api/users/getSignUpRequest/"+id
        );
        return res;
    } catch (e) {
        console.log("Error at getSignUpRequest in User Service: ", e);
    }
};

export const acceptSignUpRequest = async (email, roleName) => {
    try {
        const res = await http.put(
            "/api/users/updateRoleId/"+email,
            {
                roleName
            },
        );
        return res;
    } catch (e) {
        console.log("Error at acceptSignUpRequest in UserServices: ", e);
    }
};

export const getAllEmployee = async (id) => {
    try {
        const res = await http.get(
            "/api/users/getAllEmployee/"+id
        );
        return res;
    } catch (e) {
        console.log("Error at getAllEmployee in User Service: ", e);
    }
};

export const createUser = async (fullName, email, password, dateOfBirth, phoneNumber, address, roleName) => {
    try {
        const res = await http.post(
            "/api/users/create",
            {
                fullName,
                email,
                password,
                dateOfBirth,
                phoneNumber,
                address,
                roleName
            }
        );
        return res;
    } catch (e) {
        console.log("Error at createUser in User Service: ", e);
    }
};
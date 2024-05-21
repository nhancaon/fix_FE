import * as http from "../utils/httpRequest";

export const login = async (email, password) => {
    try {
        const res = await http.post(
            "/api/auth/login",
            {
                email,
                password,
            },
            { withCredentials: true }
        );
        return res;
    } catch (e) {
        console.log("Error at Login Service: ", e);
    }
};

export const signUpOrInsertUser = async (fullName, email, password, dateOfBirth, phoneNumber, address, roleName) => {
    try {
        const res = await http.post(
            "/api/auth/create",
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
        console.log("Error at Sign Up in Login Service: ", e);
    }
};

export const getUserInformationById = async (token, id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await http.get(
            `/api/users/getUserInformationById/${id}`,
            config);
        return res;
    } catch (e) {
        console.log("Error at Get user information: ", e);
    }
};

export const recoverPasswordByEmail = async (email) => {
    try {
        const res = await http.put(
            "/api/auth/recover-password",
            {
                email,
            }
        );
        return res;
    } catch (e) {
        console.log("Cannot recover password at Login Service: ", e);
    }
};
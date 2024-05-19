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
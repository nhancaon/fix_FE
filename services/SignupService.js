import * as http from "../utils/httpRequest";

export const signUp = async (username, email, password, dateOfBirth, phoneNumber, address) => {
    try {
        const res = await http.post(
            "/api/users/create",
            {
                username,
                email,
                password,
                dateOfBirth,
                phoneNumber,
                address
            }
        );
        return res;
    } catch (e) {
        console.log("Error at Signup service: ", e);
    }
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: async (token) => { },
    logout: () => { },
});

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState("");

    async function authenticate(token) {
        setToken(token);
        try {
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            console.log("Couldn't set token to local storage: ", error);
        }
    }

    async function logout() {
        setToken("");
        try {
            await AsyncStorage.removeItem("token");
        } catch (error) {
            console.log("Couldn't remove token from local storage: ", error);
        }
    }

    const value = {
        token: token,
        isAuthenticated: !!token,
        logout,
        authenticate,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

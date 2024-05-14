import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: async (token) => { },
    logout: () => { },
});

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState("");

    useEffect(() => {
        async function getToken() {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                console.log("Token retrieved: ", storedToken); // Add this line
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.log("Couldn't get token from local storage: ", error);
            }
        }

        getToken();
    }, []);

    async function authenticate(token) {
        setToken(token);
        try {
            await AsyncStorage.setItem("token", token);
            console.log("Token stored: ", token);
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

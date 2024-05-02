import { createContext, useReducer } from "react";
import UserReducer, { initUserState } from "./UserReducer/reducer";

export const UserContext = createContext({
    userState: initUserState,
    userDispatch: ({ type, payload }) => { },
});

const UserContextProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(UserReducer, initUserState);

    const value = { userState, userDispatch: dispatch };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

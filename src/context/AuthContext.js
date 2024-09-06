import { createContext, useContext, useState } from "react";
import { setSession, clearSession, getSession } from "../utils/session";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getSession());

    const login = (userData) => {
        setUser(userData)
        setSession(userData)
     }
    const logout =()=>{
        setUser(null)
        clearSession()
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
  };
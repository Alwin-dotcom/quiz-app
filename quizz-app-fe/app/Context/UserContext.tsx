import {createContext, useContext, useEffect, useState, ReactNode} from "react";
import axios from "axios";

interface User {
    email: string;
    userName: string;
}

interface UserContextType {
    userInfo: User | null;
    fetchUserInfo: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/quiz-app/resources/user/info", {
                withCredentials: true,
            });
            console.log("Data", response.data);
            setUserInfo(response.data);
        } catch (error) {
            console.error("User konnte nicht abgerufen werden", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{userInfo, fetchUserInfo}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

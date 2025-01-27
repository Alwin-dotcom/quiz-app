'use client'

import React, {useEffect, useState} from 'react'
import axios from "axios";

const UserInfo = () => {

    interface User {
        email: string
        userName: string
    }


    const [userInfo, SetUserInfo] = useState<User>()

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/quiz-app/resources/user/info", {withCredentials: true});
            console.log("Data", response.data)
            SetUserInfo(response.data)
        } catch (error) {
            console.error("User konnte nicht abgerufen werden", error)
        }
    };

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <div className="fixed top-0 right-0 p-4 bg-white rounded shadow-md">
            <div className="text-lg font-bold">Nutzername: {userInfo?.userName}</div>
            <div className="text-lg">Email: {userInfo?.email}</div>
        </div>
    )
}
export default UserInfo

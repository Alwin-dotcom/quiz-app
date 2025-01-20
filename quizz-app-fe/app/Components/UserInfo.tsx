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
            const response = await axios.get("http://localhost:8080/quiz-app/resources/user/info");
            SetUserInfo(response.data)
        } catch (error) {
            console.error("User konnte nicht abgerufen werden", error)
        }
    };

    useEffect(() => {
        fetchUserInfo()
    }, [userInfo])

    return (
        <div>

            <div>
                {userInfo?.userName}
            </div>
            <div>
                {userInfo?.email}
            </div>
        </div>
    )
}
export default UserInfo

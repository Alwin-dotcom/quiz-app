'use client'
import {useUser} from "@/app/Context/UserContext";

const UserInfo = () => {

    const {userInfo} = useUser();

    return (
        <div className="fixed top-4 right-4 p-4 bg-white rounded-lg shadow-xl text-seaBlue w-64 border border-gray-200">
            <div className="text-lg font-semibold mb-2 border-b pb-2">Benutzerinformationen</div>
            <div className="text-sm">
                <div className="mb-2">
                    <span className="font-medium">Nutzername:</span>
                    <span className="ml-2">{userInfo?.userName || "Unbekannt"}</span>
                </div>
                <hr className="my-2 border-gray-300"/>
                <div>
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{userInfo?.email || "Keine Email angegeben"}</span>
                </div>
            </div>
        </div>
    )
}
export default UserInfo

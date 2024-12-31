"use client"
import { useForm } from "react-hook-form"
import {DevTool} from "@hookform/devtools"

const LoginForm = () => {

    const { register,control } = useForm();

    return (
        <div className="max-w-md mx-auto mt-20 p-4 bg-white rounded-lg shadow-md">
            <form className="flex flex-col gap-4">
                <label htmlFor="email" className="text-lg font-medium">Email</label>
                <input type="email" id="email" {...register("email")} className="p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />

                <label htmlFor="password" className="text-lg font-medium">Password</label>
                <input type="password" id="password" {...register("password")} className="p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Login</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}
export default LoginForm
'use client'
import React from 'react';
import {Button} from "@heroui/button";
import  {useRouter} from "next/navigation";

const page = () => {

    const router = useRouter()

    const OnClick = () => {
        localStorage.clear()
        router.push("/")
    }

    const onCancel = () => {
        router.back()
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center ">
                <h2 >Sind sie sich sicher, dass sie abmelden möchten?</h2>
                <div className="mt-4 flex gap-4">
                    <Button onPress={OnClick} color={"danger"} >Abmelden</Button>
                    <Button onPress={onCancel}>Abrrechen</Button>
                </div>
            </div>
        </div>
    );
};

export default page;
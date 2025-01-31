'use client'
import React, {useEffect, useState} from 'react'
import Button from "@mui/material/Button";
import ListItem from "@/app/Components/ListItem";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from "next/link";
import axios from "axios";


const page = () => {


    const [ranks, setRanks] = useState([]);
    const fetchRanks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz-app/resources/user/ranks');
            const ranks = response.data;
            setRanks(ranks)
        } catch (error) {
            console.error('Error fetching ranks:', error);
        }
    }

    useEffect(() => {
        fetchRanks()
    }, [ranks]);


    return (
        <div>
            <div>
                <div className="flex  items-center justify-center mt-[250px] ">
                    <ListItem items={ranks} key={module.id}/>
                </div>
            </div>
            <div className="flex justify-center mt-10 mb-10 ">

                <Link href="/play" legacyBehavior>
                    <Button
                        startIcon={<PlayArrowIcon/>}
                        sx={{
                            width: 200,
                            height: 50,
                            backgroundColor: "#060440",
                            borderRadius: 5,
                            py: 3.5
                        }} variant="contained">
                        Ein Quiz starten
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default page

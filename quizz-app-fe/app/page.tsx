import React from 'react'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Button from "@mui/material/Button";
import ListItem from "@/app/Components/ListItem";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from "next/link";


const bestenliste = [
    {id: 1, name: "Ali"},
    {id: 2, name: "Alwin"},
    {id: 3, name: "Anni"},
    {id: 4, name: "Freddy"},
    {id: 5, name: "Lena"},
    {id: 6, name: "Max"},
    {id: 7, name: "Emma"},
    {id: 8, name: "Lukas"},

];

const page = () => {
    return (
        <div>
            <div>
                <div className="flex  items-center justify-center mt-[250px] ">
                    <ListItem items={bestenliste} key={module.id}/>
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

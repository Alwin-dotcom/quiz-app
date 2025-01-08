import React from 'react'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const page = () => {
    return (
        <div>
            {/*Leaderboard div*/}
            <div className="flex items-center justify-center w-[800px] p-4 text-seaBlue
                mx-auto bg-[#D9D9D9] text-2xl font-semibold mt-[200px] border rounded-xl shadow">
                <span>Leaderboard</span>
                <LeaderboardIcon sx={{
                    fontSize: 30,
                    ml: 2,
                }}/>
            </div>
        </div>
    )
}

export default page

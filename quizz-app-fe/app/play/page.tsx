import React from 'react'
import TableItem from "@/app/Components/TableItem";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Page = () => {
    return (
        <div>
            <div className="flex justfy-center flex-col items-center mt-[150px]">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl text-seaBlue text-center font-bold mb-4">Modul wählen:</h1>
                </div>
                <TableItem/>
                <Button
                    startIcon={<PlayArrowIcon/>}
                    sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#060440",
                        borderRadius: 5,
                        py: 3.5,
                        mt: 5
                    }} variant="contained">
                    Ein Quiz starten
                </Button>
            </div>

        </div>


    )
}
export default Page

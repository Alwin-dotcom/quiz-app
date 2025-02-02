'use client'
import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from "next/link";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const Page = () => {
    const [ranks, setRanks] = useState<{ userName: string, rank: number }[]>([]);
    const [totalRank, setTotalRank] = useState<number>();


    const fetchTotalRank = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz-app/resources/user/ranks/total', {
                withCredentials: true
            });
            setTotalRank(response.data);
            console.log("Response:", response.data);
        } catch (error) {
            console.error('Error fetching TotalRank:', error);
        }
    }
    const fetchRanks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz-app/resources/user/ranks', {
                withCredentials: true
            });
            setRanks(response.data);
        } catch (error) {
            console.error('Error fetching ranks:', error);
        }
    };

    useEffect(() => {
        fetchRanks();
        fetchTotalRank();
    }, []);


    return (
        <div>
            <div className="flex justify-center flex-col items-center h-screen ">


                <div className="flex flex-col items-center justify-center bg-gray-200 ">
                    <h1 className="text-2xl text-seaBlue text-center font-bold mb-4">Gesamtpunktzahl aller User</h1>
                    <div className="text-seaBlue">{totalRank}</div>
                </div>


                <div className="flex items-center justify-center">
                    <h1 className="text-2xl text-seaBlue text-center font-bold mb-4">Rangliste</h1>
                </div>

                {/* Tabelle für User & Scores */}
                <Paper sx={{
                    width: '80%',
                    overflow: 'hidden',
                    borderRadius: 5,
                    boxShadow: 'xl',
                    backgroundColor: '#D9D9D9',
                    border: '1px solid #D9D9D9'
                }}>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{width: '50%'}}>UserName</TableCell>
                                    <TableCell sx={{width: '50%', textAlign: 'right'}}>Punkte</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ranks.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.userName}</TableCell>
                                        <TableCell sx={{textAlign: 'right'}}>{user.rank}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {/* Quiz starten Button */}
                <div className="flex justify-center mt-10 mb-10">
                    <Link href="/play" legacyBehavior>
                        <Button
                            startIcon={<PlayArrowIcon/>}
                            sx={{
                                width: 200,
                                height: 50,
                                backgroundColor: "#060440",
                                borderRadius: 5,
                                py: 3.5
                            }}
                            variant="contained"
                        >
                            Ein Quiz starten
                        </Button>
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default Page;

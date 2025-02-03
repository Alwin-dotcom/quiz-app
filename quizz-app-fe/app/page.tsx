'use client'
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from 'axios';
import {Button} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from '@heroui/table';
import TotalScoreCard from "@/app/Components/TotalScoreCard";
import {useInfiniteScroll} from "@heroui/use-infinite-scroll";
import {useAsyncList} from "@react-stately/data";

interface UserRank {
    userName: string;
    rank: number;
}

const Page = () => {
    const [ranks, setRanks] = useState<UserRank[]>([]);
    const [totalRank, setTotalRank] = useState<number>(0);

    const fetchTotalRank = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/quiz-app/resources/user/ranks/total',
                {withCredentials: true}
            );
            setTotalRank(response.data);
        } catch (error) {
            console.error('Error fetching TotalRank:', error);
        }
    };

    const fetchRanks = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/quiz-app/resources/user/ranks',
                {withCredentials: true}
            );
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
        <div className="flex flex-col justify-center items-center h-screen">

            <TotalScoreCard totalScore={totalRank}/>

            <h1 className="text-2xl text-seaBlue text-center font-bold mb-4">Rangliste</h1>

            <div className="flex flex-col justify-center items-center w-[70%]">
                <Table>
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Punkte</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {ranks.map((rank, index) => (
                            <TableRow key={index}>
                                <TableCell>{rank.userName}</TableCell>
                                <TableCell>{rank.rank}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center mt-10 mb-10">
                <Link href="/play" legacyBehavior>
                    <Button
                        startIcon={<PlayArrowIcon/>}
                        sx={{
                            width: 200,
                            height: 50,
                            backgroundColor: '#060440',
                            borderRadius: 5,
                            py: 3.5,
                        }}
                        variant="contained"
                    >
                        Ein Quiz starten
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Page;

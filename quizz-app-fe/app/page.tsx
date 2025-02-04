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
import {Pagination, getKeyValue,} from "@heroui/react";
import TotalScoreCard from "@/app/Components/TotalScoreCard";


interface UserRank {
    userName: string;
    rank: number;
}

const Page = () => {
    const [ranks, setRanks] = useState<UserRank[]>([]);
    const [totalRank, setTotalRank] = useState<number>(0);


    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(ranks.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return ranks.slice(start, end);
    }, [page, ranks]);

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
                <Table
                    className="w-full text-center"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }>
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Punkte</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {items.map((rank, index) => (
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

'use client'

import {useState, useEffect} from "react";
import axios from 'axios';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Page {
    name: string;
    numberOfQuestions: number;
}

const ModuleTable = () => {
    const [modules, setModules] = useState<Page[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz-app/resources/question-answer',
                {withCredentials: true});
            const moduleCounts: { [key: string]: number } = {}
            response.data.forEach((question: any) => {
                const {module} = question;
                if (!moduleCounts[module]) {
                    moduleCounts[module] = 0
                }
                moduleCounts[module]++;
            })
            const formattedData: Page[] = Object.keys(moduleCounts).map(module => ({
                name: module,
                numberOfQuestions: moduleCounts[module],
            }));
            setModules(formattedData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <div className="flex items-center justify-center">
                <h1 className="text-2xl text-seaBlue text-center font-bold mb-4">Quiz auswählen</h1>
            </div>
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
                                <TableCell sx={{width: '30%'}}>Modul</TableCell>
                                <TableCell sx={{textAlign: 'right', minWidth: 150, width: '30%'}}>Anzahl
                                    Fragen</TableCell>
                                <TableCell sx={{width: '40%', textAlign: 'right'}}>Spielen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {modules.map(module => (
                                <TableRow key={module.name}>
                                    <TableCell>{module.name}</TableCell>
                                    <TableCell sx={{textAlign: 'right'}}>{module.numberOfQuestions}</TableCell>
                                    <TableCell sx={{textAlign: 'right'}}>
                                        <Link href={`/play/${module.name}`} passHref legacyBehavior>
                                            <IconButton color="primary">
                                                <PlayArrowIcon/>
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ModuleTable;
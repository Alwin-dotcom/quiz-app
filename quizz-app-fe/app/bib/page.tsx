'use client';
import * as React from 'react';
import axios from 'axios';
import {Button} from "@heroui/button";
import Link from "next/link";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from '@heroui/table';
import {EditIcon} from "@heroui/shared-icons";
import MuiButton from "@/app/Components/MUIButton";

interface Module {
    name: string;
    questions: number;
}

const ModuleTable = () => {
    const [modules, setModules] = React.useState<Module[]>([]);

    React.useEffect(() => {
        axios.get('http://localhost:8080/quiz-app/resources/question-answer',
            {
                withCredentials: true
            })
            .then(response => {
                const moduleCounts: { [key: string]: number } = {};
                response.data.forEach((question: any) => {
                    const {module} = question;
                    if (!moduleCounts[module]) {
                        moduleCounts[module] = 0;
                    }
                    moduleCounts[module]++;
                });

                const formattedData = Object.keys(moduleCounts).map(module => ({
                    name: module,
                    questions: moduleCounts[module],
                }));

                setModules(formattedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl text-seaBlue font-bold mb-4 text-center">
                Quiz auswählen
            </h1>

            <div className="flex flex-col justify-center items-center min-w-[70%]">
                <Table align={"center"}>
                    <TableHeader>
                        <TableColumn>Modul</TableColumn>
                        <TableColumn>Anzahl Fragen</TableColumn>
                        <TableColumn>Fragen bearbeiten</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {modules.map((module, index) => (
                            <TableRow key={index}>
                                <TableCell>{module.name}</TableCell>
                                <TableCell>{module.questions}</TableCell>
                                <TableCell>
                                    <Link href={`/bib/${module.name}`}>
                                        <Button><EditIcon></EditIcon></Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Link href="/bib/create" legacyBehavior>
                <div className="mt-10">
                    <MuiButton>
                    </MuiButton>
                </div>

            </Link>
        </div>
    );
};

export default ModuleTable;

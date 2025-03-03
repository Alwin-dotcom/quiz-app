'use client';
import * as React from 'react';
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
import {Pagination} from "@heroui/react";
import api from "../api";

interface Module {
    name: string;
    questions: number;
}

const ModuleTable = () => {
    const [modules, setModules] = React.useState<Module[]>([]);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 6;
    const pages = Math.ceil(modules.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return modules.slice(start, end);
    }, [page, modules]);

    React.useEffect(() => {
        api.get('/quiz-app/resources/question-answer',
            {
                headers: {
                    Authorization: "Basic " + btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
                },
                withCredentials: true
            })
            .then(response => {
                const moduleCounts: { [key: string]: number } = {};
                // eslint-disable-next-line
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
        <div className="flex flex-col items-center justify-center  p-4 mt-[147px]">
            <h1 className="text-2xl text-seaBlue font-bold mb-4 text-center">
                Quiz auswählen
            </h1>

            <div className="flex flex-col justify-center items-center   min-w-[70%]">
                <Table
                    align={"center"}
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
                        <TableColumn>Modul</TableColumn>
                        <TableColumn>Anzahl Fragen</TableColumn>
                        <TableColumn>Fragen bearbeiten</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {items.map((module, index) => (
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

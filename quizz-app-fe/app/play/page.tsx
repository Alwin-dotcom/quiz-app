'use client'
import {useState, useEffect, useMemo} from "react";
import Link from "next/link";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@heroui/table";
import {Button} from "@heroui/button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import * as React from "react";
import {Pagination} from "@heroui/react";
import api from '../api';

interface Page {
    name: string;
    numberOfQuestions: number;
}

const ModuleTable = () => {
    const [modules, setModules] = useState<Page[]>([]);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 6;
    const pages = Math.ceil(modules.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return modules.slice(start, end);
    }, [page, modules]);

    const fetchData = async () => {
        try {
            const response = await api.get(
                "/quiz-app/resources/question-answer",
                {
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                `${localStorage.getItem("username")}:${localStorage.getItem("password")}`
                            ),
                    },
                    withCredentials: true,
                }
            );

            // Es wird nur gezählt, wenn die Frage als approved markiert ist.
            const moduleCounts: { [key: string]: number } = {};
            // eslint-disable-next-line
            response.data.forEach((question: any) => {
                // Hier wird geprüft, ob die Frage approved ist.
                if (question.status === "APPROVED") {
                    const {module} = question;
                    if (!moduleCounts[module]) {
                        moduleCounts[module] = 0;
                    }
                    moduleCounts[module]++;
                }
            });

            const formattedData: Page[] = Object.keys(moduleCounts).map((module) => ({
                name: module,
                numberOfQuestions: moduleCounts[module],
            }));
            setModules(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl text-seaBlue font-bold mb-4 text-center">
                Quiz auswählen
            </h1>

            <div className="flex flex-row gap-3 min-w-[70%]">
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
                    }
                >
                    <TableHeader>
                        <TableColumn>Modul</TableColumn>
                        <TableColumn>Anzahl Fragen</TableColumn>
                        <TableColumn>Spielen</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {items.map((module, index) => (
                            <TableRow key={index}>
                                <TableCell>{module.name}</TableCell>
                                <TableCell>{module.numberOfQuestions}</TableCell>
                                <TableCell>
                                    <Link href={`/play/${module.name}`} passHref legacyBehavior>
                                        <Button>
                                            <PlayArrowIcon/>
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ModuleTable;

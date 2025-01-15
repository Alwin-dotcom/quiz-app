'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useState} from "react";

interface Column {
    id: 'modul' | 'kzl' | 'questions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'modul', label: 'Modul', minWidth: 170},
    {id: 'kzl', label: 'Kürzel', minWidth: 170, align: 'right'},
    {id: 'questions', label: 'Anzahl Fragen', minWidth: 170, align: 'right'}

];

interface Data {
    modul: string;
    kzl: string;
    questions: number;
}

function createData(
    modul: string,
    kzl: string,
    questions: number,
): Data {
    return {modul, kzl, questions};
}

const rows = [
    createData('India', 'INAS', 1324171354),
    createData('China', 'CNFV', 1403500365),
    createData('Italy', 'ITEF', 60483973),
    createData('United States', 'USEF', 327167434),
    createData('Canada', 'CACF', 37602103),
    createData('Australia', 'AUVF', 25475400),
    createData('Germany', 'DEVD', 83019200),
    createData('Ireland', 'IEVDS', 4857000),
    createData('Mexico', 'MXVW', 126577691),
    createData('Japan', 'JPCS', 126317000),

];

export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
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
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.modul}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
'use client';
import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import {Button} from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';


interface Module {
    name: string;
    questions: number;
}

const ModuleTable = () => {
    const [modules, setModules] = React.useState<Module[]>([]);
    const [selectedModule, setSelectedModule] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

    const handleModuleSelect = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleModuleSelectChange = (module: string) => {
        setSelectedModule(module);
        setAnchorEl(null);
    };

    const filteredModules = selectedModule
        ? modules.filter(module => module.name === selectedModule)
        : modules;

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
                                <TableCell>
                                    Modul auswählen
                                    <IconButton
                                        aria-controls="module-menu"
                                        aria-haspopup="true"
                                        onClick={handleModuleSelect}
                                        size="small"
                                    >
                                        <FilterListIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell sx={{textAlign: 'right', minWidth: 150}}>Anzahl Fragen</TableCell>
                                <TableCell sx={{textAlign: 'right', minWidth: 150}}>Fragen bearbeiten</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredModules.map(module => (
                                <TableRow key={module.name}>
                                    <TableCell>{module.name}</TableCell>
                                    <TableCell sx={{textAlign: 'right'}}>{module.questions}</TableCell>
                                    <TableCell sx={{textAlign: 'right'}}>
                                        <Link href={`/bib/${module.name}`}>
                                            <IconButton><EditIcon></EditIcon></IconButton>
                                        </Link>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Menu
                id="module-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleModuleSelectChange('')}>Alle Module</MenuItem>
                {modules.map(module => (
                    <MenuItem key={module.name}
                              onClick={() => handleModuleSelectChange(module.name)}>{module.name}</MenuItem>
                ))}
            </Menu>
            <Link href="/bib/create" legacyBehavior>
                <Button
                    sx={{
                        width: 200,
                        height: 50,
                        backgroundColor: "#060440",
                        borderRadius: 5,
                        py: 3.5,
                        mt: 5,
                    }}
                    variant="contained"
                >
                    Fragen erstellen
                </Button>
            </Link>
        </div>
    );
};

export default ModuleTable;
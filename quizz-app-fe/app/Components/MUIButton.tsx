import React from 'react'
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const MuiButton = () => {
    return (

        <Button
            startIcon={<AddIcon/>}
            sx={{
                width: 200,
                height: 50,
                backgroundColor: '#060440',
                borderRadius: 5,
                py: 3.5,
            }}
            variant="contained"
        >
            Quiz erstellen
        </Button>
    )
}
export default MuiButton

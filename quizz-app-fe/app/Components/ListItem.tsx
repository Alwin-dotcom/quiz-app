'use client'

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import {FixedSizeList} from 'react-window';
import {List, ListItemButton, ListItemText} from '@mui/material';
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export interface ListItemProps {
    items: { id: number; name: string }[];
}

export default function ListItem({items}: ListItemProps) {
    return (
        <List
            className="border rounded-xl shadow"
            style={{
                width: '100%',
                maxWidth: 800,
                backgroundColor: '#D9D9D9',
                padding: 0,
                margin: 0,
            }}
        >
            <ListSubheader
                sx={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#060440',
                }}
                component="div"
                id="nested-list-subheader"
            >
                <span>Leaderboard</span>
                <LeaderboardIcon sx={{
                    fontSize: 30,
                    ml: 2,
                }}/>
            </ListSubheader>
            <FixedSizeList
                height={400}
                width={800}
                itemSize={50}
                itemCount={items.length}
            >
                {({index, style}: { index: number, style: React.CSSProperties }) => (
                    <div style={style}>
                        <ListItemButton key={items[index].id}>
                            <ListItemText primary={`${index + 1}.${items[index].name}`}/>
                        </ListItemButton>
                    </div>
                )}
            </FixedSizeList>
        </List>

    );
}

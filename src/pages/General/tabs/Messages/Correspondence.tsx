import {List, ListItem, useTheme} from '@mui/material';
import React from 'react';
import {ListItemText} from "../../../../mui";

interface Correspondence {
    correspondence: any
}
export const Correspondence: React.FC<Correspondence> = ({correspondence}) => {
    const theme = useTheme();

    const isDarkTheme = theme.palette.mode === 'dark';
    const  color = isDarkTheme ? '#90caf929' : '#1976d214';


    return (
        <List>
            {correspondence.correspondence.map((message: any, i: number) => (
                <ListItem key={i} disableGutters sx={{ backgroundColor: message.type === "to" ? color : "gray", borderRadius: 3, mt: 2, pl: 2, maxWidth: "30%" }}>
                    <ListItemText
                        primary={message.mes}/>
                </ListItem>
            ))}
        </List>
    );
};


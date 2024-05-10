import React, {useEffect, useState} from 'react';
import {List, ListItemText} from "../../../../mui";
import {Avatar, ListItemButton, ListItemAvatar, useTheme} from "@mui/material";

interface MessageProps {
    message: any,
    select: number | null,
    setSelect: (value: number) => void;
}

export const Message: React.FC<MessageProps> = ({message, select, setSelect}) => {
    const theme = useTheme();

    const isDarkTheme = theme.palette.mode === 'dark';

    const [backgroundColor, setBackgroundColor] = useState<string>('');


    useEffect(() => {
        if (select === message.idUser) {
            const  color = isDarkTheme ? '#90caf929' : '#1976d214';
            setBackgroundColor(color);
        } else {
            setBackgroundColor("");
        }


    }, [select]);



    return (
        <ListItemButton sx={{backgroundColor, pl: 2}} key={message.idUser} disableGutters onClick={() => setSelect(message.idUser)} divider>
            <ListItemAvatar>
                <Avatar>{message.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={message.name}
                secondary={message.message}
                secondaryTypographyProps={{component: 'div'}}
            />
        </ListItemButton>
    );
};


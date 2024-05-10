import React, {useEffect, useState} from 'react';
import {List, ListItemText} from "../../../../mui";
import {Avatar, ListItemButton, ListItemAvatar, useTheme, Divider} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface TaskProps {
    task: any,
    select: number | null,
    setSelect: (value: number) => void;
}

export const Task: React.FC<TaskProps> = ({task, select, setSelect}) => {
    const theme = useTheme();

    const isDarkTheme = theme.palette.mode === 'dark';

    const [backgroundColor, setBackgroundColor] = useState<string>('');


    useEffect(() => {
        if (select === task.idTask) {
            const  color = isDarkTheme ? '#90caf929' : '#1976d214';
            setBackgroundColor(color);
        } else {
            setBackgroundColor("");
        }


    }, [select]);



    return (
        <ListItemButton sx={{backgroundColor, pl: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}} key={task.idTask} disableGutters onClick={() => setSelect(task.idTask)} divider>
            <ListItemText
                primary={task.name}
            />
            {task.passed ? <CheckIcon sx={{mr: 2}}/> : <CloseIcon sx={{mr: 2}}/>}

        </ListItemButton>
    );
};


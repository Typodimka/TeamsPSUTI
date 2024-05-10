import React from 'react';
import {Box, Paper, Typography, Divider, IconButton, Tooltip} from "../../../../mui";
import DownloadIcon from '@mui/icons-material/Download';
import {useAppSelector} from "../../../../store/hook";

const notifications = [{
    name: "Заявление на диплом",
    time: "22.04.2024 в 17:30",
}, {
    name: "Теория по языку программирования JavaScript",
    time: "22.04.2024 в 17:00",
}, {
    name: "Теория по математике",
    time: "22.04.2024 в 16:40",
}]

export const Assignment = () => {

    const { language } = useAppSelector(state => state.general);


    return (
        <Box sx={{width: "100%", height: "100%"}}>
            <Paper sx={{width: 600, borderRadius: 3, mt: 2, ml: "auto", mr: "auto"}}>
                <Box sx={{p: 2}}>
                    <Typography>{language["Materials"]}</Typography>
                </Box>
                {notifications.map((item, i) => (
                    <Box>
                        <Divider/>
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Box sx={{p: 2}}>

                                <Typography>{item.name} </Typography>
                                <Typography>{item.time} </Typography>
                            </Box>
                            <Tooltip title="Установить" sx={{mr : 2}}>
                                <IconButton>
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>

                        </Box>

                    </Box>
                ))}
            </Paper>



        </Box>

    );
};


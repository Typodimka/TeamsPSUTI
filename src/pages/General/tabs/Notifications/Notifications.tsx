import React from 'react';
import {Box, Paper, Typography, Divider} from "../../../../mui";
import {useAppSelector} from "../../../../store/hook";

 const notifications = [{
    name: "Иван Иванов ",
    action: "выложил новое задание",
    time: "22.04.2024 в 17:30",
},{
    name: "Иван Иванов ",
    action: "выложил новое задание",
    time: "22.04.2024 в 17:00",
}, {
    name: "Иван Иванов ",
    action: "выложил новое задание",
    time: "22.04.2024 в 16:40",
}]

export const Notifications = () => {

    const {  language } = useAppSelector(state => state.general);


    return (
        <Box sx={{width: "100%", height: "100%"}}>
            <Paper sx={{width: 600, borderRadius: 3,  mt: 2, ml: "auto", mr: "auto"}}>
                <Box sx={{p: 2}}>
                    <Typography >{language["Notification"]}</Typography>
                </Box>
                {notifications.map((item, i) => (
                    <Box>
                        <Divider  />

                        <Box sx={{p: 2}}>
                            <Typography >{item.name} {item.action} </Typography>
                            <Typography >{item.time} </Typography>
                        </Box>
                    </Box>
                ))}
            </Paper>
        </Box>

    );
};


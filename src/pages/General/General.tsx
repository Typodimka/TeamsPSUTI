import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import GradeIcon from '@mui/icons-material/Grade';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import {styled} from "@mui/material";
import {useState} from "react";
import {Messages} from "./tabs/Messages/Messages";
import {Notifications} from "./tabs/Notifications/Notifications";
import {Grade} from "./tabs/Grade/Grade";
import {Assignment} from "./tabs/Assignment/Assignment";
import {Tasks} from "./tabs/Tasks/Tasks";
import {useAppSelector} from "../../store/hook";



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, width: "calc(100vw - 106.9px)", height: "calc(100vh - 48px)"  }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const tabs = [ <Notifications />, <Messages />, <Grade />, <Tasks />, <Assignment />]


const AntTab = styled((props: any) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        padding: 5,
    }),
);


export const  General = () => {
    const [value, setValue] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { language } = useAppSelector(state => state.general);

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "calc(100vh - 48px)",  mt: 6 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >

                <AntTab label={language["Notification"]} icon={<NotificationsIcon fontSize="small"/>}/>
                <AntTab label={language["Message"]}  icon={<MessageIcon fontSize="small"/>}/>
                <AntTab label={language["Grade"]}  icon={<GradeIcon fontSize="small"/>}/>
                <AntTab label={language["Tasks"]}  icon={<TaskIcon fontSize="small"/>}/>
                <AntTab label={language["Materials"]} icon={<AssignmentIcon fontSize="small"/>}/>

            </Tabs>

            {tabs.map((tab, i) => (
                <TabPanel value={value} index={i}>
                    {tab}
                </TabPanel>
            ))}
        </Box>
    );
}
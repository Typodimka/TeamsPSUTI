import React, {useState} from 'react';
import {Box, Divider, FormControl, Grid, List, Typography} from "../../../../mui";
import {Paper} from "@mui/material";
import {Task} from "./Task";
import {TextInput} from "../../../../components/TextInput";
import {TaskDescription} from "./TaskDescription";
import {tasks, tasksDescription} from "./dataTasks";
import {useAppSelector} from "../../../../store/hook";




export const Tasks = () => {

    const {  language } = useAppSelector(state => state.general);


    const [select, setSelect] = useState<null | number>(null)
    const [valueSearch, setValueSearch] = useState<string>("")

    const [filterTasks, setFilterTasks] = useState(tasks)

    const searchHandler = (val: string) => {
        setValueSearch(val)

        if (val === "") {
            setFilterTasks(tasks)

        } else {
            let copyData = [...tasks]
            copyData = copyData.filter(item => item.name.includes(val))
            setFilterTasks(copyData)
        }

    }


    return (
        <Grid container spacing={2} sx={{width: "100%", height: "100vh"}}>
            <Grid item xs={3} sx={{height: "100%"}}>
                <Paper sx={{height: "100%"}}>

                    <Box sx={{width: "100%", p: 2, pl: 3}}>
                        <FormControl sx={{width: "90%"}}>
                            <TextInput value={valueSearch} onBlurHandler={(value) => searchHandler(value)}
                                       variant="outlined" label={language["Search"]}/>
                        </FormControl>
                    </Box>
                    <Divider/>


                    <List sx={{p: 0}}>
                        {filterTasks.map((task, i) => (
                            <Task task={task} select={select} setSelect={(val) => setSelect(val)} key={i}/>
                        ))}

                    </List>
                </Paper>

            </Grid>

            <Grid item xs={9} sx={{p: 0}}>

                {select === null ? (
                    <Typography sx={{
                        textAlign: 'center',
                        lineHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>{language["The task is not selected"]}</Typography>

                ) : (

                    <Box sx={{width: "100%", height: "calc(100vh - 136px)"}}>
                        {tasksDescription.find(item => item.idTask === select) &&
                            <TaskDescription task={tasksDescription.find(item => item.idTask === select)}/>}

                    </Box>
                )}


            </Grid>


        </Grid>
    );
};


import React, {useState} from 'react';
import {Box, Divider, FormControl, Grid, Tooltip, Typography} from "../../../../mui";
import {IconButton, List, Paper} from "@mui/material";
import {TextInput} from "../../../../components/TextInput";
import {correspondences, data} from "./data";
import {Message} from "./Message";
import {Correspondence} from "./Correspondence";
import SendIcon from '@mui/icons-material/Send';
import {useAppSelector} from "../../../../store/hook";

export const Messages = () => {

    const {  language } = useAppSelector(state => state.general);


    const [select, setSelect] = useState<number | null>(null)

    const [messageValue, setMessageValue] = useState<string>("")
    const [valueSearch, setValueSearch] = useState<string>("")
    const [filterMessages, setFilterMessages] = useState(data)

    const sendMessage = () => {
        if (messageValue !== "") {
            const findIndex = correspondences.findIndex(item => item.idUser === select)

            if (findIndex !== undefined) {

                correspondences[findIndex].correspondence.push({type: "to", mes: messageValue})
            }
            setMessageValue("")
        }
    }

    const searchHandler = (val: string) => {
        setValueSearch(val)

        if (val === "") {
            setFilterMessages(data)

        } else {
            let copyData = [...data]
            copyData = copyData.filter(item => item.name.includes(val))
            setFilterMessages(copyData)
        }

    }

    return (
        <Grid container spacing={2} sx={{width: "100%", height: "100vh"}}>
            <Grid item xs={4} sx={{height: "100%"}}>
                <Paper sx={{height: "100%"}}>
                    <Box sx={{width: "100%", p: 2, pl: 3}}>
                        <FormControl sx={{width: "90%"}}>
                            <TextInput value={valueSearch} onBlurHandler={(value) => searchHandler(value)} variant="outlined" label={language["Search"]}/>
                        </FormControl>
                    </Box>
                    <Divider/>
                    <List sx={{p: 0}}>
                        {filterMessages.map((message, i) => (
                            <Message select={select} setSelect={(value: number) => setSelect(value)} message={message} key={i}/>
                        ))}
                    </List>

                </Paper>

            </Grid>
            {/*<Divider orientation="vertical"/>*/}
            <Grid item xs={8} sx={{p: 0}}>
                {select === null ? (
                    <Typography sx={{
                        textAlign: 'center',
                        lineHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>{language["The chat is not selected"]}</Typography>

                ) : (

                    <Box sx={{width: "100%", height: "calc(100vh - 136px)"}}>
                        {correspondences.find(item => item.idUser === select) && <Correspondence correspondence={correspondences.find(item => item.idUser === select)}/>}

                    </Box>
                )}
                <Paper sx={{
                    ml: "-16px",
                    p: 2,
                    width: "100%",
                    borderRadius: 0,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <FormControl sx={{width: "95%"}}>
                        <TextInput value={messageValue} onBlurHandler={(val) => setMessageValue(val)} variant="outlined" label="Поиск"/>
                    </FormControl>

                    <Tooltip title={language["Send"]} sx={{ml: 2}}>
                        <IconButton onClick={sendMessage}>
                            <SendIcon/>
                        </IconButton>
                    </Tooltip>
                </Paper>
            </Grid>


        </Grid>

    );
};


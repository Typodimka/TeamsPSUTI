import React, {useState} from 'react';
import {ModalUI} from "./ModalUI";
import {Avatar, Box, Typography, FormControl, Grid} from "@mui/material";
import {Button, ButtonGroup, Divider, FormControlLabel, Switch} from "../mui";
import {useAppDispatch, useAppSelector} from "../store/hook";
import {TextInput} from "./TextInput";
import {changeTheme, setCurrentLanguage, setUser} from "../store/reducers/general-reducer";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";

interface ModalSettingsProps {
    active: boolean;
    setActive: (setModalActive: boolean) => void;
}

export const ModalSettings: React.FC<ModalSettingsProps> = ({active, setActive}) => {

    const dispatch = useAppDispatch();
    const styleBtn = { mt: 2, display: 'flex', justifyContent: 'flex-end' };


    const {themeApp, currentLanguage, user,language} = useAppSelector(
        (state) => state.general
    );
    const initialValue = user?.email ? user.email : ""

    const [value, setValue] = useState(initialValue)

    const saveEmail = (newValue: string) => {
        if (user) {
            setValue(newValue)
            dispatch(setUser({...user, email: newValue}))
        }

    }

    const children = (
        <Box sx={{p: 3, width: 400}}>
            <Typography>
                {language["Settings"]}
            </Typography>
            <Divider sx={{mt: 2}}/>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2}}>
                <Avatar sx={{width: 70, height: 70}}>{user?.name[0]}</Avatar>
                <Box>
                    <Typography>
                        {user?.subName} {user?.name}
                    </Typography>
                    <FormControl sx={{width: 300}}>
                        <TextInput value={value} onBlurHandler={val => saveEmail(val)} label="email"/>
                    </FormControl>
                </Box>

            </Box>

            <Grid container spacing={2} sx={{mt: 2}}>
                <Grid item xs={6}>
                    {language[ "Select a language"]}:
                </Grid>
                <Grid item xs={6}>
                    <ButtonGroup size="small">
                        <Button
                            variant={currentLanguage === "russian" ? "contained" : "outlined"}
                            onClick={() => dispatch(setCurrentLanguage("russian"))}
                        >
                            RU
                        </Button>
                        <Button
                            variant={currentLanguage === "english" ? "contained" : "outlined"}
                            onClick={() => dispatch(setCurrentLanguage("english"))}
                        >
                            EN
                        </Button>
                    </ButtonGroup>

                </Grid>

                <Grid item xs={6}>
                    {language["Choose a theme"]}:
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        sx={{alignItems: "end", flexGrow: 1, ml: "auto"}}
                        control={<Switch onChange={(e, val) => dispatch(changeTheme(val))}
                                         checked={themeApp}/>}
                        label={themeApp ? <WbSunnyIcon/> : <NightlightIcon/>}
                    />
                </Grid>

            </Grid>
            <ButtonGroup size="small" sx={styleBtn}>
                <Button variant="outlined" onClick={() =>setActive(false)} >
                    {language["Cancel"]}
                </Button>
            </ButtonGroup>

        </Box>
    )






    return (
        <ModalUI active={active} setActive={(val) => setActive(val)}>
            {children}
        </ModalUI>
    );
};


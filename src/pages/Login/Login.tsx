import React, {useState} from 'react';
import {Button, FormControl, Paper} from "../../mui";
import {TextInput} from "../../components/TextInput";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {useNavigate} from 'react-router-dom';
import {setUser} from "../../store/reducers/general-reducer";

import {authUser} from "../../api/api";

const stylePaper = {
    p: 5,
    pl: 20,
    pr: 20,
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    pb: 5,
    mt: 8
};


export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {language} = useAppSelector((state) => state.general);

    const [helperText, setHelperText] = useState<string[]>(['', '']);
    const [settings, setSettings] = useState({
        login: '',
        password: ''
    });


    const onBlurEmail = (value: string) => {
        const copyHelperText = [...helperText];
        copyHelperText[0] = '';
        setHelperText(copyHelperText);
        setSettings(prevSettings => ({...prevSettings, login: value}));
    };

    const onBlurPassword = (value: string) => {
        const copyHelperText = [...helperText];
        copyHelperText[1] = '';
        setHelperText(copyHelperText);
        setSettings(prevSettings => ({...prevSettings, password: value}));
    };

    const handleClick = () => {
        const copyHelperText = [...helperText];
        const {login, password} = settings
        if (login === '') {
            copyHelperText[0] = language["required_field"];
        }

        if (password === '') {
            copyHelperText[1] = language["required_field"];
        }
        setHelperText(copyHelperText);


        if (login !== '' && password !== '') {
            const fetchUserData = async () => {

                try {
                    const res = await authUser({login, password});
                    const {user} = res.data
                    if (user) {
                        await dispatch(setUser(user))
                        await navigate('/General');
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            fetchUserData();


            // if (getUser) {
            //     dispatch(setUser(getUser))
            // }

        }

    }


    return (
        <Paper sx={stylePaper}>
            <FormControl sx={{marginTop: 2, width: '250px'}}>
                <TextInput
                    value={settings.login}
                    label={language["mail_address"]}
                    helper={helperText[0]}
                    onBlurHandler={value => onBlurEmail(value.toString())}
                />
            </FormControl>

            <FormControl sx={{marginTop: 2, width: '250px'}}>
                <TextInput
                    type="password"
                    value={settings.password}
                    label={language["password"]}
                    helper={helperText[1]}
                    onBlurHandler={value => onBlurPassword(value.toString())}
                />
            </FormControl>

            <Button variant='outlined' sx={{mt: 5}} onClick={handleClick}>{language["authorization"]}</Button>


        </Paper>
    );
};

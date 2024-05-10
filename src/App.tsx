import React, { useEffect } from 'react';
import {useAppDispatch, useAppSelector} from "./store/hook";
import { createTheme, ThemeProvider } from "@mui/material";
import { Paper} from "./mui";
import { Header } from "./components/Header";
import { Login } from "./pages/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import {General} from "./pages/General/General";
import {loadLanguage, loadTheme, loadUser} from "./utils/localData";
import {changeTheme, setCurrentLanguage, setUser} from "./store/reducers/general-reducer";

function App() {
    const { themeApp } = useAppSelector(state => state.general);
    const theme = createTheme({
        palette: {
            mode: themeApp ? 'dark' : 'light',
            // primary: {
            //     main: orange[500],
            // },
            background: {
                default: themeApp ? '#212121' : '#fff',
                paper: themeApp ? '#212121' : '#fff',
            },
        },
    });


    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    useEffect(() => {
        const getUser = loadUser()
        const getLanguage = loadLanguage()
        const getTheme = loadTheme()



        if (getLanguage) {
            dispatch(setCurrentLanguage(getLanguage))
        }

        if (getTheme) {
            dispatch(changeTheme(getUser))
        }

        if (getUser) {
            dispatch(setUser(getUser))
            navigate('/General');

        }
    }, []);

    return (

        <ThemeProvider theme={theme}>
            <Paper sx={{height: '100vh', width: '100vw', borderRadius: '0', overflow: 'hidden'}}>
                <Header/>

                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/General" element={<General/>}/>
                </Routes>
            </Paper>



        </ThemeProvider>


    );
}

export default App;

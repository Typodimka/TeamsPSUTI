import React, {useState} from "react";
import {
 Menu, MenuItem,
 Stack,
 Typography,
} from "../mui";

import {
     setUser,
} from "../store/reducers/general-reducer";
import {useAppDispatch, useAppSelector} from "../store/hook";
import {AppBar, IconButton, Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {saveUser} from "../utils/localData";
import {ModalSettings} from "./ModalSettings";

export const Header = () => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {user, language} = useAppSelector((state) => state.general);




    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isActive, setIsActive] = useState(false)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutClickHandler = () => {
        dispatch(setUser(null))
        saveUser(null)
        navigate("/")
    }


    const settingsClickHandler = () => {
        handleClose();
        setIsActive(true)
    };


    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
                <Toolbar variant="dense">

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {language["Educational portal"]}
                    </Typography>
                    {user && (
                        <div>
                            <Stack>
                                <IconButton
                                    size="small"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Stack>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={settingsClickHandler}>{language["Settings"]}</MenuItem>
                                <MenuItem onClick={logoutClickHandler}>{language["Exit"]}</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>


            <ModalSettings active={isActive} setActive={(val) => setIsActive(val)}/>
        </>

    );
};

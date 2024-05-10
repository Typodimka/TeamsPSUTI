import React from 'react';
import Modal from '@mui/material/Modal';
import {SxProps} from '@mui/material';
import {Box, Paper} from "../mui";

interface ModalPropsType {
    active: boolean;
    setActive: (setModalActive: boolean) => void;
    children: React.ReactNode;
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export const ModalUI: React.FC<ModalPropsType> = (
    {
        active,
        setActive,
        children,
    },
) => {
    return (
        <Modal sx={{zIndex: 10}} open={active} onClose={() => setActive(!active)}>
            <Box sx={style}>
                <Paper>
                    {children}
                </Paper>
            </Box>
        </Modal>
    );
};

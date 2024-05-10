import React from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppSelector } from '../store/hook';
import {Box, Button, Typography} from "../mui";

const btnStyles = {
    fontSize: '12px',
    padding: '5px 10px',
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface UploadFileProps {
    selectedFile: File | null;
    setSelectedFile: (newFile: File) => void;

    // Расширения файлов
    accept?: string;
}

export const UploadFile: React.FC<UploadFileProps> = ({
                                                          selectedFile,
                                                          setSelectedFile,
                                                          accept,
                                                      }) => {
    const { language } = useAppSelector(state => state.general);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={btnStyles}
            >
                {language['Select file']}
                <VisuallyHiddenInput
                    accept={accept}
                    type="file"
                    onChange={e => handleFileChange(e)}
                />
            </Button>
            <Typography sx={{ ml: 1 }}>
                {selectedFile ? `${selectedFile.name}` : `${language['file not selected']}`}
            </Typography>
        </Box>
    );
};


UploadFile.defaultProps = {
    accept: undefined,
};
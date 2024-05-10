import React, { ChangeEvent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface TextInputProps {
    value: string ;
    label?: string;
    type?: string;
    helper?: string;
    onBlurHandler: (value: string ) => void;
    variant?: "outlined" | "standard"
}

export const TextInput: React.FC<TextInputProps> = ({
                                                        value,
                                                        label,
                                                        type,
                                                        helper,
                                                        onBlurHandler,
                                                        variant
                                                    }) => {
    const [input, setInput] = useState<string >(value);
    const [helperText, setHelperText] = useState<string | undefined>(helper);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHelperText('');
                setInput(e.target.value);

    };

    useEffect(() => {
        setInput(value);
        setHelperText(helper);
    }, [value, helper]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const showPasswordButton =
        type === 'password' ? (
            <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            </InputAdornment>
        ) : null;

    return (
        <TextField
            label={label}
            required
            variant= {variant ? variant : "standard"}
            value={input}
            onChange={handleInputChange}
            onBlur={() =>
                onBlurHandler(typeof input === 'string' ? input.trim() : input)
            }
            type={showPassword ? 'text' : type}
            error={!!helperText}
            helperText={!helperText ? '' : helperText}
            InputProps={{
                endAdornment: showPasswordButton,
            }}
        />
    );
};

TextInput.defaultProps = {
    type: 'text',
    helper: '',
    label: ""
};
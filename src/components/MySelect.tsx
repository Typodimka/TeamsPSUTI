import React from 'react';
import { SelectProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { MenuItem, Select } from '../mui';

interface MySelectProps {
    options: string[] | number[];
    onChangeOption: (option: any) => void;
    prefixValue?: string;
}

export const MySelect: React.FC<MySelectProps & SelectProps<number | string>> = ({
                                                                                     options,
                                                                                     onChangeOption,
                                                                                     value,
                                                                                     prefixValue,
                                                                                 }) => {

    const handleChange = (event: SelectChangeEvent) => {
        onChangeOption(event.target.value);
    };

    const mappedOptions = options.map(option => {
        const validOpt = () => {
            if (prefixValue)
                return option >= 0 ? `${prefixValue}+${option}` : prefixValue + option;
            if (option === 'Unknown') return 'Неизвестный';
            return option;
        };
        return (
            <MenuItem value={option} key={option}>
                {validOpt()}
            </MenuItem>
        );
    });

    return (
        <Select
            fullWidth
            value={String(value)}
            MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
            onChange={handleChange}
        >
            {mappedOptions}
        </Select>
    );
};

MySelect.defaultProps = {
    prefixValue: '',
};

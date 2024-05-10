import React from 'react';
import {IconButton, InputLabel, Tooltip} from '../mui';
import LinkIcon from '@mui/icons-material/Link';

interface MyInputLabelPropsType {
    title: string;
    tooltip?: string;
}

export const MyInputLabel: React.FC<MyInputLabelPropsType> = (
    {
        tooltip,
        title,
    }) => {
    return (
        <InputLabel>
            {title}
            {!!tooltip &&
                <Tooltip title={tooltip}
                         placement='right'
                         arrow>
                    <IconButton>
                        <LinkIcon color='primary'/>
                    </IconButton>
                </Tooltip>}
        </InputLabel>
    );
};
MyInputLabel.defaultProps = {
    tooltip: '',
};

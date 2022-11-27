import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { SvgIcon } from '@mui/material';
interface CFIconLabelButtonProps {
    text: string;
    startIcon?: any;
    endIcon?: any;
    variant?: 'outlined' | 'contained';
}

const styles = {
    button: { width: '90%' },
};

export default function CFIconLabelButton({ text, variant, startIcon, endIcon }: CFIconLabelButtonProps) {
    return (
        <Button sx={styles.button} variant={variant} startIcon={startIcon} endIcon={endIcon}>
            {text}
        </Button>
    );
}

import React, { useState } from 'react';
import { List, ListItem, ListItemText, DialogTitle, Dialog } from '@mui/material';

import { itemType } from '../../types/api';

interface CFSelectDialogProps {
    size: false | undefined;
    open: boolean;
    setOpen: (value: boolean) => void;
    Contents: () => JSX.Element;
}

const CFSelectDialog = (props: CFSelectDialogProps) => {
    const { open, setOpen, Contents, size } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={size} fullWidth={true}>
            <Contents />
        </Dialog>
    );
};

CFSelectDialog.defaultProps = {
    open: false,
    size: 'sm',
};

export default CFSelectDialog;

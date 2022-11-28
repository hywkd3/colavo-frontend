import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { discountType, itemType } from '../../types/api';

interface CFAddDialogProps {
    open: boolean;
    itemList: itemType[] | discountType[];
    onClose: (value?: any) => void;
}

const CFAddDialog = (props: CFAddDialogProps) => {
    const { onClose, itemList, open } = props;

    const handleListItemClick = (value: itemType | discountType) => {
        onClose(value);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>시술 선택</DialogTitle>
            <List>
                {itemList.map((item, idx) => (
                    <ListItem onClick={() => handleListItemClick(item)} key={item.name}>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};
export default CFAddDialog;

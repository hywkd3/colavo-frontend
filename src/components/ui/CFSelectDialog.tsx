import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import { itemType } from '../../types/api';

const emails = ['username@gmail.com', 'user02@gmail.com'];

interface CFSelectDialogProps {
    open: boolean;
    itemList: itemType[];
    selectedList: itemType[];
    onClose: (value: itemType[]) => void;
}

const CFSelectDialog = (props: CFSelectDialogProps) => {
    const { onClose, itemList, selectedList, open } = props;

    const handleClose = () => {
        onClose(selectedList);
    };

    const handleListItemClick = (value: itemType) => {
        console.log('value', value);
        let index = 0;
        let isSelected = selectedList.find((item, idx) => {
            if (item.name === value.name) {
                index = idx;
                return true;
            }
            return false;
        });
        console.log('isSelected', isSelected);
        let result: itemType[] = [];
        if (isSelected) {
            selectedList.forEach(item => {
                if (item.name !== value.name) {
                    result.push(item);
                }
            });
        } else {
            result = [...selectedList];
            result.push(value);
        }
        onClose(result);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>시술 선택</DialogTitle>
            <List sx={{ pt: 0 }}>
                {itemList.map((item, idx) => (
                    <ListItem onClick={() => handleListItemClick(item)} key={item.name}>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};
export default CFSelectDialog;

import React, { useState, Dispatch, SetStateAction } from 'react';
import { Typography, Grid, ListItemText, ListItemButton, List, Divider, AppBar, Toolbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { CFIconLabelButton, CFAddDialog, CFFullSizeModal } from '../../ui';
import { itemType, discountType } from '../../../types/api';

const styles = {
    container: {
        my: 2,
    },
};

interface AddButtonContainerProps {
    itemList: Array<itemType>;
    discountList: Array<discountType>;
    curItems: Array<itemType>;
    curDiscounts: Array<discountType>;
    setCurItems: Dispatch<SetStateAction<itemType[]>>;
    setCurDiscounts: Dispatch<SetStateAction<discountType[]>>;
}

const AddButtonContainer = (props: AddButtonContainerProps) => {
    const { itemList, discountList, curItems, curDiscounts, setCurItems, setCurDiscounts } = props;

    const [iOpen, setIOpen] = useState(false);
    const [dOpen, setDOpen] = useState(false);

    const handleItemSelect = (val: itemType) => {
        // 시술 체크
        const isSelected = curItems.findIndex(item => item.name === val.name);

        if (isSelected === -1) {
            setCurItems([...curItems, val]);
        } else {
            let result = [...curItems];
            result.splice(isSelected, 1);
            setCurItems(result);

            // 기존 할인에 시술 항목 제거
            let curDiscountsTmp = [...curDiscounts];
            curDiscounts.forEach((item1, idx1) => {
                if (item1?.items) {
                    const tmp = item1.items;
                    tmp.forEach((item2, idx2) => {
                        if (item2.name === val.name) {
                            curDiscountsTmp[idx1].items.splice(idx2, 1);
                        }
                    });
                    if (curDiscountsTmp[idx1].items.length === 0) curDiscountsTmp.splice(idx1, 1);
                }
            });
        }
    };

    const handleDiscountSelect = (val: discountType) => {
        // 시술 체크
        const isSelected = curDiscounts.findIndex(item => item.name === val.name);

        if (isSelected === -1) {
            val.isDiscount = true;
            val.items = curItems;
            setCurDiscounts([...curDiscounts, val]);
        } else {
            let result = [...curDiscounts];
            result.splice(isSelected, 1);
            setCurDiscounts(result);
        }
    };

    const handleDDialogOpen = () => {
        setDOpen(true);
    };

    const AddItemIContents = () => {
        return (
            <>
                <AppBar color="inherit" sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setIOpen(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            시술메뉴
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {itemList.map((item, idx) => (
                        <>
                            <ListItemButton onClick={() => handleItemSelect(item)} key={item.name}>
                                <ListItemText primary={item.name} />
                                {curItems.find(ele => ele.name === item.name) ? <CheckIcon /> : <></>}
                            </ListItemButton>
                            <Divider />
                        </>
                    ))}
                </List>
            </>
        );
    };

    const AddItemDContents = () => {
        return (
            <>
                <AppBar color="inherit" sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setDOpen(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            할인
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {discountList.map((item, idx) => (
                        <>
                            <ListItemButton onClick={() => handleDiscountSelect(item)} key={item.name}>
                                <ListItemText primary={item.name} />
                                {curDiscounts.find(ele => ele.name === item.name) ? <CheckIcon /> : <></>}
                            </ListItemButton>
                            <Divider />
                        </>
                    ))}
                </List>
            </>
        );
    };

    return (
        <>
            <Grid container sx={styles.container}>
                <Grid xs={6}>
                    <CFIconLabelButton text={'시술'} variant={'outlined'} startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setIOpen(true)} btnStyle={{ mr: 2 }} />
                </Grid>
                <Grid xs={6}>
                    <CFIconLabelButton text={'할인'} variant={'contained'} startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => setDOpen(true)} btnStyle={{ ml: 2 }} />
                </Grid>
            </Grid>
            <CFFullSizeModal open={iOpen} setOpen={setIOpen} Contents={AddItemIContents} />
            <CFFullSizeModal open={dOpen} setOpen={setDOpen} Contents={AddItemDContents} />
        </>
    );
};
export default AddButtonContainer;

import React, { useState, Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { CFIconLabelButton, CFAddDialog } from '../../ui';
import { itemType, discountType } from '../../../types/api';

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

    const handleIDialogClose = (val: itemType) => {
        setIOpen(false);

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

    const handleDDialogClose = (val: discountType) => {
        setDOpen(false);

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

    const handleIDialogOpen = () => {
        setIOpen(true);
    };

    const handleDDialogOpen = () => {
        setDOpen(true);
    };
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <CFIconLabelButton text={'시술'} variant={'outlined'} startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleIDialogOpen} />
            </Grid>
            <CFAddDialog itemList={itemList} open={iOpen} onClose={handleIDialogClose} />
            <Grid item xs={6}>
                <CFIconLabelButton text={'할인'} variant={'contained'} startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleDDialogOpen} />
            </Grid>
            <CFAddDialog itemList={discountList} open={dOpen} onClose={handleDDialogClose} />
        </Grid>
    );
};
export default AddButtonContainer;

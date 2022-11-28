import React, { useState, useMemo, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

import { convertNumToPrice, convertAryToString } from '../../../../utils/fommater';
import { itemType, discountType } from '../../../../types/api';
import { currencyTypes } from '../../../../types/common';
import { CFSelectDialog } from '../../../ui';

interface CartItemProps {
    key: string;
    item: itemType;
    idx: number;
    currency: currencyTypes;
    itemList: Array<itemType>;
    discountList: Array<discountType>;
    setItemList: React.Dispatch<React.SetStateAction<itemType[]>>;
    setDiscountList: React.Dispatch<React.SetStateAction<discountType[]>>;
}

const CartItem = ({ item, idx, currency, itemList, discountList, setItemList, setDiscountList }: CartItemProps) => {
    const getCurrencyText = (price: number): string => {
        let priceTxt = convertNumToPrice(price);
        return `${currency.position === 'before' ? currency.simbol : ' '}${priceTxt}${currency.position === 'last' ? currency.simbol : ''}`;
    };

    const secondaryActionCart = (count: number, idx: number) => {
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select value={`${count}`} onChange={e => handleChangeCart(idx, e)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>
        );
    };

    const handleChangeCart = (idx: number, event: SelectChangeEvent) => {
        let val = event.target.value;
        let ary = [...itemList];
        ary[idx].count = Number(val);
        setItemList(ary);
    };

    return (
        <ListItem secondaryAction={secondaryActionCart(item.count, idx)}>
            <Stack spacing={1}>
                <Typography variant="subtitle1" display="block" gutterBottom>
                    {item.name}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {`가격: ${getCurrencyText(item.price)}`}
                </Typography>
            </Stack>
        </ListItem>
    );
};

export default CartItem;

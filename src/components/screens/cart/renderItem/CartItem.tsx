import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { convertNumToPrice, getCurrencyText } from '../../../../utils/fommater';
import { itemType, discountType } from '../../../../types/api';
import { currencyTypes } from '../../../../types/common';

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
            <FormControl sx={{ minWidth: 64 }}>
                <Select sx={{ height: 35 }} value={`${count}`} onChange={e => handleChangeCart(idx, e)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
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

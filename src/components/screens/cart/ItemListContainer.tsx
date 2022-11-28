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

import { convertNumToPrice, convertAryToString } from '../../../utils/fommater';
import { itemType, discountType } from '../../../types/api';
import { currencyTypes } from '../../../types/common';
import { CFSelectDialog } from '../../ui';
import CartItem from './renderItem/CartItem';
import DiscountItem from './renderItem/DiscountItem';

interface ItemListContainerProps {
    itemList: Array<itemType>;
    currency: currencyTypes;
    discountList: Array<discountType>;
    setItemList: React.Dispatch<React.SetStateAction<itemType[]>>;
    setDiscountList: React.Dispatch<React.SetStateAction<discountType[]>>;
}

const styles = {
    container: {
        width: '100%',
    },
};

const ItemListContainer = ({ itemList, currency, discountList, setItemList, setDiscountList }: ItemListContainerProps) => {
    const [totPrice, setTotPrice] = useState<number>(0);
    const [totDiscountPrice, setTotDiscountPrice] = useState<number>(0);

    useEffect(() => {
        let totPriceCalc = itemList.reduce((acc, item) => acc + item.price * item.count, 0);
        setTotPrice(totPriceCalc);

        let activeDiscounts = discountList.filter(discount => discount.isDiscount);
        let totDiscountPriceCalc = activeDiscounts.map(discount => discount.items.reduce((acc, item) => acc + item.price * item.count * discount.rate, 0)).reduce((acc, i) => acc + i, 0);
        setTotDiscountPrice(totDiscountPriceCalc);
    }, [itemList, discountList]);

    const getCurrencyText = (price: number): string => {
        let priceTxt = convertNumToPrice(price);
        return `${currency.position === 'before' ? currency.simbol : ' '}${priceTxt}${currency.position === 'last' ? currency.simbol : ''}`;
    };

    return (
        <>
            <List sx={styles.container}>
                {itemList?.map((v, i) => {
                    return (
                        <CartItem
                            key={`cart-item-${i}`}
                            item={v}
                            idx={i}
                            itemList={itemList}
                            discountList={discountList}
                            currency={currency}
                            setItemList={setItemList}
                            setDiscountList={setDiscountList}
                        />
                    );
                })}
                {discountList?.map((v, i) => {
                    return (
                        <DiscountItem
                            key={`discount-item-${i}`}
                            discount={v}
                            idx={i}
                            itemList={itemList}
                            discountList={discountList}
                            currency={currency}
                            setItemList={setItemList}
                            setDiscountList={setDiscountList}
                        />
                    );
                })}
            </List>
            <Divider />
            <Stack
                sx={{ width: '100%', position: 'fixed', height: `${existItem ? '15%' : '5%'}`, bottom: 0, maxWidth: 'md' }}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography variant="h6" display="block" gutterBottom>
                    합계:
                </Typography>
                <Typography variant="h5" display="block" gutterBottom>
                    {`${getCurrencyText(totPrice - totDiscountPrice)}`}
                </Typography>
            </Stack>
        </>
    );
};
export default ItemListContainer;

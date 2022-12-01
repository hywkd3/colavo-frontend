import React from 'react';
import { List, ListItem, ListItemText, AppBar, Toolbar, Divider, Button, Typography, Stack, DialogContent, DialogActions } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { convertNumToPrice, getCurrencyText } from '../../../../utils/fommater';
import { itemType, discountType } from '../../../../types/api';
import { currencyTypes } from '../../../../types/common';
import { CFSelectDialog } from '../../../ui';

interface DiscountItemProps {
    key: string;
    discount: discountType;
    idx: number;
    currency: currencyTypes;
    itemList: Array<itemType>;
    discountList: Array<discountType>;
    setItemList: React.Dispatch<React.SetStateAction<itemType[]>>;
    setDiscountList: React.Dispatch<React.SetStateAction<discountType[]>>;
}
const DiscountItem = ({ discount, idx, currency, itemList, discountList, setItemList, setDiscountList }: DiscountItemProps) => {
    const [open, setOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        if (discount.items.length === 0) {
            deleteDiscount(discount);
        }
    };
    const deleteDiscount = (discount: discountType) => {
        let tmpList = discountList.filter(element => element.name !== discount.name);
        setDiscountList(tmpList);
    };

    const setDiscountContents = (discount: discountType) => {
        return (
            <>
                <AppBar color="inherit" sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {discount.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <List sx={{ pt: 0 }}>
                        {itemList.map((item, idx) => (
                            <>
                                <ListItem onClick={() => handleListItemClick(item)} key={item.name}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={<Typography sx={{ display: 'inline' }} component="span" variant="caption" color="text.primary">{`가격: ${getCurrencyText(item.price)}`}</Typography>}
                                    />
                                    {discount.items.find(ele => ele.name === item.name) ? <CheckIcon /> : <></>}
                                </ListItem>
                                <Divider />
                            </>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button color={'error'} onClick={() => deleteDiscount(discount)}>
                        삭제
                    </Button>
                    <Button onClick={handleDialogClose}>확인</Button>
                </DialogActions>
            </>
        );
    };

    const handleListItemClick = (value: itemType) => {
        let index = 0;
        let isSelected = discount.items.find((item, idx) => {
            if (item.name === value.name) {
                index = idx;
                return true;
            }
            return false;
        });

        let result: itemType[] = [];
        if (isSelected) {
            discount.items.forEach(item => {
                if (item.name !== value.name) {
                    result.push(item);
                }
            });
        } else {
            result = [...discount.items];
            result.push(value);
        }

        let tmpList = [...discountList];
        tmpList = tmpList.map(item => (item.name === discount.name ? { ...item, items: result } : item));
        setDiscountList(tmpList);
    };

    const secondaryActionDiscount = (items: Array<itemType>, idx: number) => {
        return (
            <>
                <Button variant="outlined" onClick={handleDialogOpen}>
                    수정
                </Button>
                <CFSelectDialog open={open} setOpen={setOpen} Contents={() => setDiscountContents(discount)} />
            </>
        );
    };

    const getCurrencyText = (price: number): string => {
        let priceTxt = convertNumToPrice(price);
        return `${currency.position === 'before' ? currency.simbol : ' '}${priceTxt}${currency.position === 'last' ? currency.simbol : ''}`;
    };

    const getSelectedItem = (discount: discountType): string => {
        let isDiscount = discount.isDiscount && discount.items && discount.items.length > 0 ? true : false;
        if (isDiscount) {
            let result = discount.items.reduce((acc, item) => acc + `${item.name}, `, '');
            return result.slice(0, -2);
        } else {
            let result = '';
            itemList.forEach(item => (result += `${item.name}, `));
            return result.slice(0, -2);
        }
    };
    const getDiscountPrice = (discount: discountType): string => {
        const rate = discount.rate;
        let result = discount.items?.reduce((acc, item) => {
            acc += item.price * item.count * rate;
            return acc;
        }, 0);

        result = Number.parseInt(result + '');
        return getCurrencyText(result);
    };

    return (
        <ListItem secondaryAction={secondaryActionDiscount(discount?.items, idx)}>
            <Stack spacing={1} alignItems="flex-start">
                <Typography variant="subtitle1">{discount.name}</Typography>
                <Typography variant="caption" sx={{ color: 'gray' }}>{`${getSelectedItem(discount)}`}</Typography>
                <Typography variant="caption" sx={{ color: 'red' }}>{`-${getDiscountPrice(discount)}(${(discount.rate * 100).toFixed()}%)`}</Typography>
            </Stack>
        </ListItem>
    );
};

export default DiscountItem;

import React from 'react';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { convertNumToPrice } from '../../../../utils/fommater';
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

    const handleDialogClose = (val: itemType[]) => {
        setOpen(false);

        let tmpList = [...discountList];
        tmpList = tmpList.map(item => (item.name === discount.name ? { ...item, items: val } : item));
        setDiscountList(tmpList);
    };

    const secondaryActionDiscount = (items: Array<itemType>, idx: number) => {
        return (
            <>
                <Button variant="outlined" onClick={handleDialogOpen}>
                    선택
                </Button>
                <CFSelectDialog itemList={itemList} selectedList={discount.items} open={open} onClose={handleDialogClose} />
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
                <Typography variant="subtitle1" display="block" gutterBottom>
                    {discount.name}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {`${getSelectedItem(discount)}`}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {`-${getDiscountPrice(discount)}(${(discount.rate * 100).toFixed()}%)`}
                </Typography>
            </Stack>
        </ListItem>
    );
};

export default DiscountItem;

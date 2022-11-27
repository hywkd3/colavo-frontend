import * as React from 'react';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import Stack from '@mui/material/Stack';
import { CFIconLabelButton } from '../../ui';

export default function AddButtonContainer() {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <CFIconLabelButton text={'시술'} variant={'outlined'} startIcon={<AddCircleOutlineOutlinedIcon />} />
            </Grid>
            <Grid item xs={6}>
                <CFIconLabelButton text={'할인'} variant={'contained'} startIcon={<AddCircleOutlineOutlinedIcon />} />
            </Grid>
        </Grid>
    );
}

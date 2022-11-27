import React, { useEffect, useState, useMemo } from 'react';
import Container from '@mui/material/Container';



const CartContainer = () => {

    useEffect(() => {
        fetch('https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData')
            .then(response => response.json())
            .then(json => {
            });
    }, []);

    return (
        <Container maxWidth={'md'}>
        </Container>
    );
};

export default CartContainer;

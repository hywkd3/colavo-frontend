import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

interface CFBottomButtonProps {
    text: string;
    startIcon?: any;
    endIcon?: any;
    variant?: 'outlined' | 'contained';
    onPress?: () => void;
}

export default function CFBottomButton({ onPress, text, variant, startIcon, endIcon }: CFBottomButtonProps) {
    return (
        <Container maxWidth={'md'} sx={styles.bottom_container}>
            <Button sx={styles.bottom_button} className=".bottom-button" href="#" onClick={onPress} variant={variant} startIcon={startIcon} endIcon={endIcon}>
                {text}
            </Button>
        </Container>
    );
}

const styles = {
    bottom_container: {
        position: 'fixed',
        bottom: 0,
        maxWidth: 'md',
        height: '10%',
        bgcolor: '#a4c1ff',
    },
    bottom_button: {
        mt: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

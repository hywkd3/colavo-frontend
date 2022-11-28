import Button from '@mui/material/Button';
interface CFIconLabelButtonProps {
    text: string;
    startIcon?: any;
    endIcon?: any;
    variant?: 'outlined' | 'contained';
    onClick?: () => void;
}

const styles = {
    button: { width: '90%' },
};

export default function CFIconLabelButton(props: CFIconLabelButtonProps) {
    const { text, variant, startIcon, endIcon, onClick } = props;
    return (
        <Button onClick={onClick} sx={styles.button} variant={variant} startIcon={startIcon} endIcon={endIcon}>
            {text}
        </Button>
    );
}

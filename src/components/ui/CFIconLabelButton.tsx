import Button from '@mui/material/Button';
interface CFIconLabelButtonProps {
    text: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    variant?: 'outlined' | 'contained';
    btnStyle?: Object;
    btnColor?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    onClick?: () => void;
}

const styles = {
    button: { width: '100%' },
};

export default function CFIconLabelButton(props: CFIconLabelButtonProps) {
    const { text, variant, startIcon, endIcon, btnStyle, btnColor, onClick } = props;
    return (
        <Button onClick={onClick} sx={{ ...styles.button, ...btnStyle }} color={btnColor} variant={variant} startIcon={startIcon} endIcon={endIcon}>
            {text}
        </Button>
    );
}

CFIconLabelButton.defaultProps = {
    startIcon: <></>,
    endIcon: <></>,
    variant: 'outlined',
    btnStyle: {},
    btnColor: 'primary',
};

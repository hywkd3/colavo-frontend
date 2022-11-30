import Button from '@mui/material/Button';
interface CFIconLabelButtonProps {
    text: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    variant?: 'outlined' | 'contained';
    btnStyle?: Object;
    onClick?: () => void;
}

CFIconLabelButton.defaultProps = {
    startIcon: <></>,
    endIcon: <></>,
    variant: 'outlined',
    btnStyle: {},
};

const styles = {
    button: { width: '100%' },
};

export default function CFIconLabelButton(props: CFIconLabelButtonProps) {
    const { text, variant, startIcon, endIcon, btnStyle, onClick } = props;
    return (
        <Button onClick={onClick} sx={{ ...styles.button, ...btnStyle }} variant={variant} startIcon={startIcon} endIcon={endIcon}>
            {text}
        </Button>
    );
}

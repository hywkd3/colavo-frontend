import React, { ReactElement, Ref, forwardRef } from 'react';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface FullScreenDialogProps {
    open: boolean;
    // itemList: any;
    Contents: () => JSX.Element;
    setOpen: (val: boolean) => void;
    // onClose: (value?: any) => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props: FullScreenDialogProps) {
    const { open, setOpen, Contents } = props;
    // const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        // onClose(false);
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Contents />
            </Dialog>
        </div>
    );
}

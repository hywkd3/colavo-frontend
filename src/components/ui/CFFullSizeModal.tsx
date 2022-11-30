import React, { ReactElement, Ref, forwardRef } from 'react';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface FullScreenDialogProps {
    open: boolean;
    Contents: () => JSX.Element;
    setOpen: (val: boolean) => void;
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

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Contents />
            </Dialog>
        </div>
    );
}

import { useCallback, useContext, useEffect, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import StatusAlertContext from '@/context/StatusAlertContext';

const StatusAlert = () => {
    const { message, setMessage, status, setStatus } = useContext(StatusAlertContext);
    const [open, setOpen] = useState(false);

    const handleClose = useCallback(() => {
        setOpen(false);
        setStatus('')
        setMessage('')
        
    }, [setMessage, setStatus]);

    useEffect(() => {
        if (status) {
            setOpen(true);
        }
        const timer = setTimeout(() => {
            handleClose();
        }, 7000);

        return () => clearTimeout(timer);
    }, [handleClose, status]);

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={7000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={status as AlertColor} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default StatusAlert;
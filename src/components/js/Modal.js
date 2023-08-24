import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Modal({ visible, handleClose, handleOK }) {
    return (
        <Box sx={{
            display: `${visible ? 'block' : 'none'}`,
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: '#000000ad',
        }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '1rem 2rem',
                zIndex: 1,
                borderRadius: 1,
                backgroundColor: '#fdfdfd',
                width: '300px',
            }}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    CONFIRM
                </Typography>
                <Typography id="modal-modal-text" variant="h6" component="h2" sx={{ py: 1 }}>
                    Are you sure you want to delete this chat room?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={handleOK}>OK</Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ ml: 1 }}>Close</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Modal;
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { db, collection, addDoc, serverTimestamp } from '../../firebase';
import { useStateValue } from './stateProvider';
import { useHistory } from 'react-router';

export default function AddNewChat() {
    const history = useHistory();
    const [{ user }] = useStateValue();
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState('');
    const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1).toLowerCase();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createChatRoom = () => {
        if (roomName) {
            addDoc(collection(db, 'chatRooms'), {
                creator: user.uid,
                name: capitalize(roomName),
                timestamp: serverTimestamp(),
            }).then((ele) => {
                history.push(`/rooms/${ele._key.path.segments[1]}`);
            });
        }
        setRoomName('');
        setOpen(false);
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <Button
                sx={{ fontSize: '1.5rem', borderTop: '1px solid #fff', borderBottom: '1px solid #fff', width: '100%' }}
                variant="text"
                aria-label="add new chat"
                onClick={handleClickOpen}
            >
                add new chat
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Chat</DialogTitle>
                <DialogContent sx={{ py: 0 }} >
                    <DialogContentText>
                        Please enter the name of chat room you want to create.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#000' }} aria-label="cancel" onClick={handleClose}>Cancel</Button>
                    <Button aria-label="create" onClick={createChatRoom}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
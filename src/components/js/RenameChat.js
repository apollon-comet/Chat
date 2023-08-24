import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { db, doc, collection, onSnapshot } from '../../firebase';
import { useParams } from 'react-router';

export default function RenameChat({ visible, handleClose, handleChange }) {
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1).toLowerCase();

    useEffect(() => {
        if (roomId) {
            const unsubscribe = onSnapshot(doc(collection(db, 'chatRooms'), roomId), (snapshot) => (
                setRoomName(snapshot.data()?.name)
            ), (error) => (error));

            return () => {
                unsubscribe();
            }
        }
    }, [roomId]);

    const handleUpdate = () => {
        handleChange(capitalize(roomName));
        setRoomName('');
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <Dialog open={visible} onClose={handleClose}>
                <DialogTitle>Create Chat</DialogTitle>
                <DialogContent sx={{ py: 0 }} >
                    <DialogContentText>
                        Please enter the name of chat room.
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
                    <Button aria-label="Update" onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
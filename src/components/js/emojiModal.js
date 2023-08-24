import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Picker from 'emoji-picker-react';

export default function AddNewChat() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, emojiObject) => {
        if (emojiObject.emoji) {
            document.getElementById(`textField`).value += emojiObject.emoji;
        }
        setOpen(false);
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="send" onClick={handleClickOpen}>
                <InsertEmoticonIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <Picker onEmojiClick={handleClose} />
            </Dialog>
        </div>
    );
}
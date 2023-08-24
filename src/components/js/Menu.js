import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { db, doc, collection, updateDoc, deleteDoc, serverTimestamp } from '../../firebase';
import RenameChat from './RenameChat';
import Modal from './Modal';
import { useHistory } from 'react-router';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '1px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function Menus({ roomId }) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [renameChat, setRenameChat] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setAnchorEl(null);
        setRenameChat(true);
    };
    const handleChange = (roomName) => {
        if (roomName) {
            updateDoc(doc(collection(db, 'chatRooms'), roomId), {
                name: roomName,
                timestamp: serverTimestamp(),
            });
        }
        setRenameChat(false);
    };
    const handleDelete = () => {
        setAnchorEl(null);
        setOpenModal(true);
    };
    const handleConfirmation = () => {
        deleteDoc(doc(collection(db, 'chatRooms'), roomId));
        setOpenModal(false);
        history.push('/');
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableelevation="true"
                onClick={handleClick}
                endicon={<KeyboardArrowDownIcon />}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} disableRipple>
                    <DeleteIcon />
                    Delete
                </MenuItem>
            </StyledMenu>
            <Modal visible={openModal} handleClose={() => setOpenModal(false)} handleOK={handleConfirmation} />
            <RenameChat visible={renameChat} handleClose={() => setRenameChat(false)} handleChange={(roomName) => handleChange(roomName)} />
        </div>
    );
}
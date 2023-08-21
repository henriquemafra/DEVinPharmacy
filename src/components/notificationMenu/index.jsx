import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Badge, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
        <IconButton color="inherit" onClick={handleClick}>
                        <Badge badgeContent={1} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Notificação 1</MenuItem>
        <MenuItem onClick={handleClose}>Notificação 2</MenuItem>
        <MenuItem onClick={handleClose}>Notificação 3</MenuItem>
      </Menu>
    </Box>
  );
}

import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Badge, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logoSMW from '../../assets/img/logoSMW.png'

export default function NotificationMenu() {

  //Logica de abertura do menu de notificações
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
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'start', width: '350px', p: 2 }}>
            <Avatar alt="logo" src={logoSMW}/>
            <Typography variant='body2' component='div' sx={{ ml: 1, whiteSpace: 'normal' }}>
              <b>Equipe de desenvolvimento:</b> <br/>
              Nova funcionalidade! Agora você pode ver e pesquisar todos os medicamentos!
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'start', width: '350px', p: 2 }}>
            <Avatar alt="logo" src={logoSMW} />
            <Typography variant='body2' component='div' sx={{ ml: 1, whiteSpace: 'normal' }}>
            <b>Equipe de desenvolvimento:</b> <br/>
              Nova funcionalidade! Agora você pode ver a localização de todas as farmácias! Acesse o mapa agora mesmo!
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'start', width: '350px', p: 2 }}>
            <Avatar alt="logo" src={logoSMW} />
            <Typography variant='body2' component='div' sx={{ ml: 1, whiteSpace: 'normal' }}>
            <b>Equipe de desenvolvimento:</b> <br/>
              Nova funcionalidade! Agora você pode adicionar novas farmácias!
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'start', width: '350px', p: 2 }}>
            <Avatar alt="logo" src={logoSMW} />
            <Typography variant='body2' component='div' sx={{ ml: 1, whiteSpace: 'normal' }}>
            <b>Equipe de desenvolvimento:</b> <br/>
              Nova funcionalidade! Agora você pode adicionar novos medicamentos!
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}

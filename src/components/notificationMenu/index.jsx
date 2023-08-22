import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Badge, Box, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logoSMW from '../../assets/img/logoSMW.png'
import { newNotifications } from './notificationsExamples';
import { Link } from 'react-router-dom';

export default function NotificationMenu() {


  // Estado para armazenar dados das notificações
  const [notificationsData, setNotificationsData] = useState(newNotifications); // Inicialize com as novas notificações

  // useEffect para carregar dados do localStorage quando o componente for montado
  useEffect(() => {
    const storedData = localStorage.getItem('notificationsData'); // Obtém os dados do localStorage
    const data = JSON.parse(storedData); // Converte os dados para um objeto JavaScript

    if (data && data.length > 0) { // Verifica se existem dados no localStorage
      setNotificationsData(data); // Atualiza o estado das notificações com os dados do localStorage
    }
  }, []);

  // Função para atualizar os dados de notificações no localStorage e no estado
  const updateNotificationsData = (updateNotifications) => {
    localStorage.setItem('notificationsData', JSON.stringify(updateNotifications)); // Atualiza o localStorage
    setNotificationsData(updateNotifications); // Atualiza o estado das notificações
  };

  // Função para lidar com a exclusão de uma notificação
  const handleDelete = (index) => {
    const updateNotifications = [...notificationsData]; // Cria uma cópia do array de notificações
    updateNotifications.splice(index, 1); // Remove a notificação no índice especificado
    updateNotificationsData(updateNotifications); // Chama a função para atualizar os dados
  };

  // Estado para controlar a abertura e fechamento do menu de notificações
  const [anchorEl, setAnchorEl] = useState(null);

  // Função para abrir o menu de notificações ao clicar no ícone
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu de notificações
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notificationsData.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notificationsData.length === 0 ? ( // Verifica se não há notificações no LocalStorage
          <MenuItem>
            <Typography variant="body2" component="div" sx={{ p: 2, textAlign: 'center' }}>
              Nenhuma notificação disponível, verifique novamente mais tarde.
            </Typography>
          </MenuItem>
        ) : (
          notificationsData.map((notification, index) => ( // Função map para exibir todas as notificações de notificationsExamples
            <Link to={notification.link} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <MenuItem key={index} onClick={() => handleDelete(index)}>
                <Box sx={{ display: 'flex', alignItems: 'start', width: '350px', p: 2 }}>
                  <Avatar alt="logo" src={logoSMW} />
                  <Typography variant='body2' component='div' sx={{ ml: 1, whiteSpace: 'normal' }}>
                    <b>{notification.title}:</b> <br />
                    {notification.notification}
                  </Typography>
                </Box>
              </MenuItem>
            </Link>
          ))
        )}
      </Menu>
    </Box>
  );
}
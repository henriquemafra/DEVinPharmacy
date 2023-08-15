import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MedicationIcon from '@mui/icons-material/Medication';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import MapIcon from '@mui/icons-material/Map';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Componente para listar opções do Menu Lateral

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <MedicationIcon />
      </ListItemIcon>
      <ListItemText primary="Medicamentos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Novo Medicamento" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AddBusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Nova Farmácia" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Mapa de Farmácias" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HelpCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Precisa de ajuda?" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Mais opções
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notificações" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);
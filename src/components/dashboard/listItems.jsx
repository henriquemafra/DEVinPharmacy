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
import { Link } from 'react-router-dom';

// Componente para listar opções do Menu Lateral

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard/medicaments">
      <ListItemIcon>
        <MedicationIcon />
      </ListItemIcon>
      <ListItemText primary="Medicamentos" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/newmedicament">
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Novo Medicamento" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/newpharmacy">
      <ListItemIcon>
        <AddBusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Nova Farmácia" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/map">
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Mapa de Farmácias" />
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
        <HelpCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Ajuda" />
    </ListItemButton>
  </React.Fragment>

 
);

export const terciaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
        </Link>
    </ListItemButton>
  </React.Fragment>

);
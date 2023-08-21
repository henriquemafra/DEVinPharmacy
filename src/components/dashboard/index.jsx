import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { CssBaseline, Drawer as MuiDrawer, Box, AppBar as MuiAppBar, Toolbar, List, Typography, IconButton, Divider, Container } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { mainListItems, secondaryListItems} from './listItems';
import { Routes, Route } from 'react-router-dom';
import NewDrugstore from '../drugstores';
import NewMedicament from '../new-medicament';
import Map from '../map';
import Help from '../help';
import Medicaments from '../listMedicaments';
import NotificationMenu from '../notificationMenu';
import NotFoundPage from '../404'
import logoSM from '../../assets/img/logoSM.png'
import logo from '../../assets/img/logo.png'



// Largura da Gaveta
const drawerWidth = 240;

// Define caracteristicas de estilo para AppBar e também controla animação de abertura e fechamento.
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Personaliza o Drawer tornando responsivo durante a abertura e fechamento.
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

export default function Dashboard() {

    const theme = useTheme();


    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
   
    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // Mantém o padding da direita quando o Drawer está fechado.
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        style={{}}
                        alt="Logo"
                        src={logoSM}
                        width="50"
                        height="50"
                    />
                    <Typography
                        component="p"
                        variant="p"
                        color="inherit"
                        fontWeight="bold"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            ml: 1
                        }}
                    >
                        Medicament Management
                    </Typography>
                    <NotificationMenu/>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <img
                        style={{ padding: '5px' }}
                        alt="Logo"
                        src={logo}
                        width="180"
                        height="45"
                    />
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems} {/* Chama a lista de opções principais do menu. */}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems} {/* Chama a lista secundária de opções do menu. */}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ my: 3 }}>
                    <Routes>
                        {/* Rotas internas para as opções do menu*/}
                        <Route path="/" element={<Medicaments />} />
                        <Route path="/newpharmacy" element={<NewDrugstore />} />
                        <Route path="/newmedicament" element={<NewMedicament />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/medicaments" element={<Medicaments />} />
                        <Route path="/help" element={<Help/>} />
                        <Route path='/*' element={<NotFoundPage/>} />
                    </Routes>
                </Container>
            </Box>
        </Box>

    );
}
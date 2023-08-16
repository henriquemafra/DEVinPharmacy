import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Button from '@mui/material/Button';

export default function NewDrugstore() {
    const isMobile = useMediaQuery('(max-width: 600px)'); 
    return (
        <Box sx={{ p: 2, overflow: 'hidden' }}>
            <Box component="form" noValidate sx={{ px: 2, overflow: 'hidden' }}>
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <AddBusinessIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />

                    Identificação
                </Typography>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nome-fantasia"
                            label="Nome Fantasia"
                            name="Nome Fantasia"
                            autoComplete="Nome Fantasia"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="telefone"
                            label="Telefone"
                            name="telefone"
                            autoComplete="telefone"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="celular"
                            label="Celular"
                            name="celular"
                            autoComplete="celular"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="razao-social"
                            label="Razão social"
                            name="razão social"
                            autoComplete="razão social"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cnpj"
                            label="CNPJ"
                            name="CNPJ"
                            autoComplete="CNPJ"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <LocationCityIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />
                    Endereço
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cep"
                            label="CEP"
                            name="cep"
                            autoComplete="cep"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="logradouro"
                            label="Logradouro/Endereço"
                            name="logradouro"
                            autoComplete="logradouro"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="numero"
                            label="Número"
                            name="numero"
                            autoComplete="numero"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bairro"
                            label="Bairro"
                            name="bairro"
                            autoComplete="bairro"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cidade"
                            label="Cidade"
                            name="cidade"
                            autoComplete="cidade"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="estado"
                            label="Estado"
                            name="estado"
                            autoComplete="estado"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="complemento"
                            label="Complemento"
                            name="complemento"
                            autoComplete="complemento"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <GpsFixedIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />
                    Geolocalização
                </Typography>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="latitude"
                            label="Latitude"
                            name="latitude"
                            autoComplete="latitude"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="longitude"
                            label="Longitude"
                            name="longitude"
                            autoComplete="longitude"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent={isMobile ? 'center' : 'flex-end'}>
                    <Button type="submit" variant="contained" sx={{ mt: 4, width: '200px' }}>
                        Cadastrar
                    </Button>
                </Grid>
            </Box>
        </Box>
    )
}
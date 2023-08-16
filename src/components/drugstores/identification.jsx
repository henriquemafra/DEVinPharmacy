import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

export default function Identification () {
    return (
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
    )
}
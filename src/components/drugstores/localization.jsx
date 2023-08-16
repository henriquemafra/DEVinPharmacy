import TextField from '@mui/material/TextField';
import { Grid, Typography, useMediaQuery } from '@mui/material';

export default function Localization () {
    return (
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
    )
}
import React, { useState, useRef } from 'react';
import { Box, TextField, Grid, Typography, useMediaQuery, Alert, Button } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';

export default function NewMedicament() {
    // Definindo se a tela é mobile
  const isMobile = useMediaQuery('(max-width: 600px)');

  // Estado para controle do feedback de sucesso do submit
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Referência para o formulário para manipulação direta
  const formRef = useRef(null);

   // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const novoMedicamento = {
      nomeMedicamento: data.get('nomemedicamento'),
      laboratorio: data.get('nomelaboratorio'),
      dosagem: data.get('dosagem'),
      descricao: data.get('descricao'),
      precounid: data.get('precounid'),
      tipo: data.get('tipomedicamento'),
    };
// obtem dados existentes no armazenamento local
    const dadosArmazenados = JSON.parse(localStorage.getItem('MedicamentosData')) || [];

     // Adiciona novo medicamento à lista existente
    const novosMedicamentos = [...dadosArmazenados, novoMedicamento];

     // Armazena dados atualizados no armazenamento local
    storeMedicamentosData(novosMedicamentos);

    // Reset do formulário após envio
    if (formRef.current) {
      formRef.current.reset();
    }
    setSubmitSuccess(true);
  };
  // Função para armazenar dados no armazenamento local
  const storeMedicamentosData = (MedicamentosData) => {
    localStorage.setItem('MedicamentosData', JSON.stringify(MedicamentosData));
  };

    return (
        <Box sx={{ p: 2, overflow: 'hidden' }}>
            <Box component="form" Validate onSubmit={handleSubmit} ref={formRef} sx={{ px: 2, overflow: 'hidden' }}>
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <MedicationIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />

                  Informações do medicamento
                </Typography>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nomemedicamento"
                            label="Nome do medicamento"
                            name="nomemedicamento"
                            autoComplete="nomemedicamento"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nomelaboratorio"
                            label="Nome do laboratório"
                            name="nomelaboratorio"
                            autoComplete="nomelaboratorio"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dosagem"
                            label="Dosagem do medicamento"
                            name="dosagem"
                            autoComplete="dosagem"
                        />
                    </Grid>
                   
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="precounid"
                            label="Preço unitário do medicamento"
                            name="precounid"
                            autoComplete="precounid"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="tipomedicamento"
                            label="Tipo do medicamento"
                            name="tipomedicamento"
                            autoComplete="tipomedicamento"
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="descricao"
                            label="Descrição do medicamento"
                            name="descricao"
                            autoComplete="descricao"
                        />
                    </Grid>
                </Grid>
                {submitSuccess && (
                    <Alert severity="success" sx={{ mt: 2, textAlign: 'center' }}>
                        Medicamento cadastrado com sucesso!
                    </Alert>)}
                <Grid container justifyContent={isMobile ? 'center' : 'flex-end'}>
                    <Button type="submit" variant="contained" sx={{ mt: 4, width: '200px' }}>
                        Cadastrar
                    </Button>
                </Grid>
            </Box>
        </Box>
    )
}
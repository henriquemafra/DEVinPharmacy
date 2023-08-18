import React, { useState, useRef } from 'react';
import { Box, TextField, Grid, Select, MenuItem, InputLabel, Paper, Typography, useMediaQuery, Alert, Button } from '@mui/material';


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
            descricaoBreve: data.get('descricaoBreve'),
            descricao: data.get('descricao'),
            precounid: data.get('precounid'),
            tipo: tipomedicamentoValue,
            
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

    const [tipomedicamentoValue, setTipomedicamentoValue] = React.useState(''); // Estado para o valor selecionado

const handleTipomedicamentoChange = (event) => {
  setTipomedicamentoValue(event.target.value); // Atualiza o valor selecionado
};


    return (
        <Box sx={{ p: 2,  overflow: 'hidden', borderBottom: '1px solid rgba(0, 0, 0, 0.12);'}}> 
            <Box component="form" Validate onSubmit={handleSubmit} ref={formRef} sx={{ px: 2, overflow: 'hidden' }}>
            <Box fullWidth sx={{ display: 'flex', mb:-1.1}}>
            
            <Typography variant='h4' sx={{ my:0, mb: 0.5 }} >
              Cadastrar
            </Typography>
          </Box>
          <Typography variant='p' color='text.secondary' sx={{mb: 3}}>Adicionar novo produto ao catálogo</Typography>
                <Box sx={{ display: 'flex', borderTop: '1px solid rgba(0, 0, 0, 0.12)'   }}>
                    <Typography variant='h6' sx={{ mt: 2 , mb: -0.5}} >
                        Informações
                    </Typography>
                </Box>
                <Typography variant='p' sx={{mb: 3}} color='text.secondary'>Preencha adequadamente todos os campos, 
                caso necessário consulte o manual de ajuda.</Typography>
                <Paper
                            sx={{
                                pt: 1,
                                px: 5,
                                pb: 3,
                                mt: 3
                            }}
                        >
                <Grid container sx={{mt: 2}} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{mt:-1}} id="tipomedicamento-label">Tipo do medicamento:</InputLabel>
                        <Select
                            
                            labelId="tipomedicamento-label"
                            id="tipomedicamento"
                            value={tipomedicamentoValue} // Defina o valor selecionado (estado)
                            onChange={handleTipomedicamentoChange} // Função para lidar com a mudança
                            label="Tipo do medicamento"
                            fullWidth
                            
                        >
                            <MenuItem value="Medicamento controlado">Medicamento controlado</MenuItem>
                            <MenuItem value="Medicamento não controlado">Medicamento não controlado</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
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

                    <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="descricaoBreve"
                            label="Breve descrição"
                            name="descricaoBreve"
                            autoComplete="descricaoBreve"
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
                </Paper>
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
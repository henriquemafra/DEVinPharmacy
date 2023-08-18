import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Card, Box, Paper, CardContent, CardActions, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { medicamentosExemplos } from './medicaments';

export default function Medicaments() {

  // Estado para armazenar os dados dos medicamentos
  const [medicamentos, setMedicamentos] = useState([]);
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Injeta os dados do objeto medicamentosExemplos no localStorage
  useEffect(() => {
    getMedicamentosData();

    const dadosArmazenados = JSON.parse(localStorage.getItem('MedicamentosData')) || [];
    if (dadosArmazenados.length === 0) {
      updateMedicamentosData([...dadosArmazenados, ...medicamentosExemplos]);
    }
  }, [medicamentosExemplos]);

  // Função para obter os dados do localStorage
  const getMedicamentosData = () => {
    const dadosArmazenados = JSON.parse(localStorage.getItem('MedicamentosData')) || [];
    setMedicamentos(dadosArmazenados);
  };

  // Função para atualizar os medicamentos no localStorage
  const updateMedicamentosData = (updatedMedicamentos) => {
    localStorage.setItem('MedicamentosData', JSON.stringify(updatedMedicamentos));
    setMedicamentos(updatedMedicamentos);
  };

  // Função para excluir um medicamento
  const handleDelete = (index) => {
    const updatedMedicamentos = [...medicamentos];
    updatedMedicamentos.splice(index, 1);
    updateMedicamentosData(updatedMedicamentos);
  };

  // Função para filtrar os medicamentos com base no termo de pesquisa
  const allMedicamentos = [...medicamentos];

  const filteredMedicamentos = allMedicamentos.filter(medicamento =>
    Object.values(medicamento).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <Box container sx={{ p: 2, overflow: 'hidden' }}>
      <Grid container sx={{ p: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.12);' }} spacing={1}>
        <Grid  item xs={12} sm={9}>
          <Box fullWidth sx={{ display: 'flex', mb:-1.1}}>
            
            <Typography variant='h4' sx={{ my:0 }} >
              Medicamentos <br/>
            </Typography>
          </Box>
          <Typography  variant='p' color='text.secondary'>Produtos em estoque</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            sx={{ mt:1.5 }}
            label="Pesquisar medicamentos"
            type="search"
            size="small"
            variant='outlined'
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ p: 1 }} spacing={1}>
        {filteredMedicamentos.map((medicamento, index) => (
          <Grid sx={{ height: 'contain', transition: 'transform 0.3s ease',
          transform: 'scale(0.9)',
          '&:hover': {
            transform: 'scale(1)',
          }, }} item key={index} xs={12} sm={4}>
            <Paper elevation={1} >
              <Card sx={{ height: 'contain' }}>

                <CardContent sx={{ p: 3, zoom:'105%'}}>
                  <Typography variant="h6" >
                    {medicamento.nomeMedicamento}
                  </Typography>
                  <Typography variant='p' sx={{ maxHeight: '3.6em', height: '36px', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} color="text.secondary" gutterBottom>
                    Laboratório: {medicamento.laboratorio} | {medicamento.tipo}
                    
                  </Typography>
                  <Typography variant="body2" sx={{ maxHeight: '3.6em', height: '36px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {medicamento.descricaoBreve || "Descrição breve não disponível"}
                  </Typography>

                </CardContent >
                <CardActions sx={{ pb: 1, pt: 0, mt: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Button color="error" size='smaill' onClick={() => handleDelete(index)} ><DeleteIcon/></Button>
                  <Button size="small"><OpenInNewIcon/></Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

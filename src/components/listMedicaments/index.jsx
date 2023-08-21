import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Card, CardActionArea, CardMedia, Box, Paper, CardContent, CardActions, Button, Modal } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { medicamentosExemplos } from './medicaments';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Remedio from '../../assets/img/remedio.png'

export default function Medicaments() {

  const theme = useTheme();

  const [selectedMedicamento, setSelectedMedicamento] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (medicamento) => {
    setSelectedMedicamento(medicamento);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMedicamento(null);
    setOpenModal(false);
  };



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
    handleCloseModal(); 
  };

  // Função para filtrar os medicamentos com base no termo de pesquisa
  const allMedicamentos = [...medicamentos];

  const filteredMedicamentos = allMedicamentos.filter(medicamento =>
    Object.values(medicamento).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ p: 2, overflow: 'hidden' }}>
      <Grid container spacing={1} sx={{ p: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.12);' }} >
        <Grid item xs={12} sm={9}>
          <Box sx={{ display: 'flex', mb: -1.1 }}>

            <Typography variant='h4' fontWeight="bold"  sx={{ my: 1 }} >
              Medicamentos <br />
            </Typography>
          </Box>
          <Typography variant='p' color='text.secondary'>Total de {filteredMedicamentos.length} produtos cadastrados no momento.</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            sx={{ mt: 1.5 }}
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
          <Grid sx={{
            height: 'contain', transition: 'transform 0.3s ease',
            transform: 'scale(0.9)',
            '&:hover': {
              transform: 'scale(1)',
            },
          }} item key={index} xs={12} sm={4}>
            <Paper elevation={1} >
              <Card sx={{ height: 'contain' }}>

                <CardContent sx={{ p: 3, zoom: '105%' }}>
                  <Typography fontWeight="bold" variant="h6" >
                    {medicamento.nomeMedicamento}
                  </Typography>
                  <Typography variant='p' sx={{ maxHeight: '3.6em', height: '38px', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} color="text.secondary" gutterBottom>
                    Laboratório: {medicamento.laboratorio} | {medicamento.tipo}

                  </Typography>
                  <Typography variant="body2" sx={{ maxHeight: '3.6em', height: '38px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {medicamento.descricaoBreve || "Descrição breve não disponível"}
                  </Typography>

                </CardContent >
                <CardActions sx={{ pb: 1, pt: 0, mt: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Button color="error" size='smaill' onClick={() => handleDelete(index)} ><DeleteIcon /></Button>
                  <Button size="small" onClick={() => handleOpenModal(medicamento)}><OpenInNewIcon /></Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          [theme.breakpoints.down('sm')]: {
            px: 5,
            height: '100vh',
            bgcolor: 'transparent',
            boxShadow: 24,
            display: 'flex',
            alignItems: 'center'
          },
          [theme.breakpoints.up('sm')]: {

            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: 'contain',
            bgcolor: 'background.paper',
            boxShadow: 24,
          },
        }}>
          <Paper sx={{ p: 1 }} elevation={8} >
            <Grid item sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size='small' color="error" onClick={() => handleDelete(selectedMedicamento.index)} ><DeleteIcon /></Button>
              <Button size='small' onClick={handleCloseModal}><CloseIcon /></Button>
            </Grid>
            <Grid sx={{ p: 4, display: 'flex', [theme.breakpoints.down('sm')]: { p: 1, } }} container>
              <Grid container sx={{ width: '400px', [theme.breakpoints.down('sm')]: {width: '300px'} }}>
                <Grid item xs={12} sm={6} sx={{ mt:2, mb:1 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {selectedMedicamento && selectedMedicamento.nomeMedicamento}
                    </Typography>
                    <Typography variant='p' component="div" sx={{ fontSize: 14, ml: 1, mt: 1 }} color="text.secondary" gutterBottom>
                      {selectedMedicamento && selectedMedicamento.dosagem}
                    </Typography>
                  </Box>

                  <Typography variant='p' component="div" sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    Laboratório: {selectedMedicamento && selectedMedicamento.laboratorio} | {selectedMedicamento && selectedMedicamento.tipo}
                  </Typography>
                 
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt:4, mb:1, textAlign: 'center', [theme.breakpoints.down('sm')]: {textAlign: 'left', mt:1}}}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    {selectedMedicamento && selectedMedicamento.precounid}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CardMedia
                    sx={{ width: '150px', height: '150px', textAlign: 'center' }}
                    component="img"
                    image={Remedio}
                    alt="remedio"
                  />
                </Grid>
              

              <Grid item xs={12} sm={12}>
                <Typography variant="body2" component="div" sx={{ textAlign: 'justify', width: '400px', mt: 2, [theme.breakpoints.down('sm')]: {width: '300px'} }} color="text.primary">
                  <Typography variant="p" sx={{ fontWeight: 'bold' }} color="text.primary">
                    Descrição:
                  </Typography> <br /> {selectedMedicamento && selectedMedicamento.descricao}
                </Typography>
              </Grid>
            </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
}

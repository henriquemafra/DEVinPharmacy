import 'leaflet/dist/leaflet.css';
import { useState, useEffect, React } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Typography, Box, Button} from '@mui/material';
import { newPharmacies } from '../drugstores/pharmaExamples'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Map() {

  // Estado para armazenar dados das farmácias
  const [farmaciasData, setFarmaciasData] = useState([]);

  // useEffect para carregar dados do localStorage quando o componente for montado
  useEffect(() => {
    // Recupera os dados armazenados do localStorage
    const storedData = localStorage.getItem('farmaciasData');
    const data = JSON.parse(storedData);

    // Verifica se os dados estão ausentes ou vazios
    if (!data || data.length === 0) {
      // Injeta os dados do newPharmacies no localStorage
      localStorage.setItem('farmaciasData', JSON.stringify(newPharmacies));
      // Define o estado farmaciasData com newPharmacies
      setFarmaciasData(newPharmacies);
    } else {
      // Define o estado farmaciasData com os dados armazenados
      setFarmaciasData(data);
    }
  }, []);

  // Obtem os dados do localStorage
  const storedData = localStorage.getItem('farmaciasData');
  // Converte para JSON
  const data = JSON.parse(storedData);

  // Renderizar alguma mensagem ou componente alternativo quando não houver dados
  if (!data || data.length === 0) {
    return <Container item xs={12} md={6} lg={12}>
      <Typography component="p" sx={{ p: 2, my: 2, textAlign: 'center' }}>
        Nenhum dado disponível para exibir no mapa.
      </Typography>
    </Container>;
  }
  const firstFarmacia = data[0];
  // Converte os dados de geolocalização para ponto flutuante
  const position = [parseFloat(firstFarmacia.latitude), parseFloat(firstFarmacia.longitude)];

  // Remove todos os caracteres não numéricos para funcionamento do WALINK
  const removeFormatting = (value) => {
    return value.replace(/\D/g, '');
  };

    // Função para atualizar os Farmacia no localStorage
    const updateFarmaciaData = (updatedFarmacias) => {
      localStorage.setItem('farmaciasData', JSON.stringify(updatedFarmacias));
      setFarmaciasData(updatedFarmacias); // Usar setFarmaciasData ao invés de setFarmacia
    };
    

    const handleDelete = (index) => {
      const updatedFarmacias = [...farmaciasData]; // Usar farmaciasData ao invés de farmacia
      updatedFarmacias.splice(index, 1);
      updateFarmaciaData(updatedFarmacias);
    };
    
  return (

    <Box sx={{ p: 2, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h4' fontWeight="bold" sx={{ mt: 1 }}>
          Farmácias
        </Typography>
      </Box>
      <Typography variant='p' component="div" sx={{mb: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.12);' }} color='text.secondary'>Total de {data.length} farmácias cadastradas até o momento.</Typography>
      <MapContainer style={{ width: '100%', height: '600px' }} center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       {data.map((farmacia, index) => (
  <Marker
    key={index}
    position={[parseFloat(farmacia.latitude), parseFloat(farmacia.longitude)]}
  >
    <Popup closeButton={false}>
      <Typography variant='p' component='div' sx={{mt: 2, mb: 4}}>
        Farmácia: {farmacia.nomeFantasia} <br />
        Razão Social: {farmacia.razaoSocial} <br />
        CNPJ: {farmacia.cnpj} <br />
        Email: {farmacia.email} <br />
        {farmacia.telefone ? `Telefone: ${farmacia.telefone}` : null} {/* Verifica se o campo é verdadeiro antes de renderizar no popup*/}
        Celular: <a target="_blank" href={`http://wa.me/55${removeFormatting(farmacia.celular)}`}>{farmacia.celular}</a> <br />
        Endereço: {farmacia.cidade}/{farmacia.estado} - {farmacia.bairro} <br />
        {farmacia.logradouro}, {farmacia.numero} - CEP: {farmacia.cep} <br />
        {farmacia.complemento ? `Complemento: ${farmacia.complemento}` : null} {/* Verifica se o campo é verdadeiro antes de renderizar no popup*/}
      </Typography>
      <Button sx={{position: 'absolute', bottom: 0 , right: 0, borderRadius: '10px 0px 10px 0px', boxShadow: 'none'}} color="error" variant='contained' size='small' onClick={() => handleDelete(index)} ><DeleteIcon /></Button>
    </Popup>
  </Marker>
))}

      </MapContainer>
    </Box>
  );
};

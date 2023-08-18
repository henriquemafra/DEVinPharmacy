import React, { useState, useEffect } from 'react';
import { TextField, Grid, Typography, Card, Box, Paper, CardContent, CardActions, Button } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';

export default function Medicaments() {

  const medicamentosExemplos = [
    {
      "nomeMedicamento": "Aspirina",
      "laboratorio": "Bayer",
      "dosagem": "500mg",
      "descricaoBreve": "Analgésico e antipirético amplamente utilizado.",
      "descricao": "A Aspirina é um medicamento analgésico, antipirético e anti-inflamatório não esteroidal amplamente utilizado para alívio de dores leves a moderadas, febre e inflamação. Seu princípio ativo é o ácido acetilsalicílico. Também é usado para prevenir doenças cardiovasculares e derrames em baixas doses.",
      "precounid": "R$ 5,00",
      "tipo": "Medicamento não controlado"
    },
    {
      "nomeMedicamento": "Paracetamol",
      "laboratorio": "Diversos",
      "dosagem": "500mg",
      "descricaoBreve": "Analgésico e antipirético muito comum.",
      "descricao": "O Paracetamol é um medicamento analgésico e antipirético utilizado para alívio de dores leves a moderadas e redução da febre. É amplamente utilizado e está disponível sob diversas marcas comerciais. Atua no sistema nervoso central e é uma alternativa ao uso de anti-inflamatórios.",
      "precounid": "R$ 3,50",
      "tipo": "Medicamento não controlado"
    },
    {
      "nomeMedicamento": "Ibuprofeno",
      "laboratorio": "Diversos",
      "dosagem": "400mg",
      "descricaoBreve": "Anti-inflamatório não esteroidal.",
      "descricao": "O Ibuprofeno é um medicamento anti-inflamatório não esteroidal utilizado para alívio de dores leves a moderadas, redução da febre e inflamação. Pode ser usado para tratar diversas condições, como dores musculares, enxaqueca, cólicas menstruais e artrite. Deve ser usado com moderação devido aos efeitos gastrointestinais.",
      "precounid": "R$ 6,50",
      "tipo": "Medicamento não controlado"
    },
    {
      "nomeMedicamento": "Metformina",
      "laboratorio": "Diversos",
      "dosagem": "850mg",
      "descricaoBreve": "Antidiabético oral comum.",
      "descricao": "A Metformina é um medicamento antidiabético oral utilizado para tratar a diabetes tipo 2. Ajuda a controlar os níveis de açúcar no sangue ao melhorar a sensibilidade à insulina e reduzir a produção de glicose pelo fígado. Também pode ser usado para prevenir o diabetes em pessoas com risco.",
      "precounid": "R$ 4,80",
      "tipo": "Medicamento controlado"
    },
    {
      "nomeMedicamento": "Lisinopril",
      "laboratorio": "Diversos",
      "dosagem": "10mg",
      "descricaoBreve": "Inibidor da enzima conversora de angiotensina (IECA).",
      "descricao": "O Lisinopril é um medicamento inibidor da enzima conversora de angiotensina (IECA) utilizado para tratar a hipertensão arterial e insuficiência cardíaca. Ele relaxa os vasos sanguíneos e ajuda a diminuir a pressão arterial, além de melhorar a função cardíaca. Também pode ser usado após ataques cardíacos.",
      "precounid": "R$ 7,20",
      "tipo": "Medicamento controlado"
    },
    {
      "nomeMedicamento": "Atorvastatina",
      "laboratorio": "Diversos",
      "dosagem": "20mg",
      "descricaoBreve": "Estatinas para controle do colesterol.",
      "descricao": "A Atorvastatina é um medicamento da classe das estatinas utilizado para controlar os níveis de colesterol no sangue. Ela reduz a produção de colesterol no fígado e ajuda a prevenir doenças cardiovasculares. É frequentemente prescrita para pessoas com alto risco de problemas cardíacos.",
      "precounid": "R$ 9,90",
      "tipo": "Medicamento controlado"
    },
    {
      "nomeMedicamento": "Omeprazol",
      "laboratorio": "Diversos",
      "dosagem": "20mg",
      "descricaoBreve": "Inibidor da bomba de prótons (IBP).",
      "descricao": "O Omeprazol é um medicamento inibidor da bomba de prótons (IBP) utilizado para reduzir a produção de ácido no estômago. É frequentemente prescrito para tratar úlceras gástricas, refluxo gastroesofágico e outras condições relacionadas ao excesso de ácido estomacal.",
      "precounid": "R$ 8,50",
      "tipo": "Medicamento controlado"
    },
    {
      "nomeMedicamento": "Morfina",
      "laboratorio": "Diversos",
      "dosagem": "10mg",
      "descricaoBreve": "Analgésico opioide.",
      "descricao": "A Morfina é um medicamento analgésico opioide utilizado para alívio de dores intensas e crônicas, como aquelas causadas por câncer ou após cirurgias complexas. Ela age no sistema nervoso central para reduzir a percepção da dor. Deve ser usada com extrema precaução devido ao risco de dependência.",
      "precounid": "R$ 15,00",
      "tipo": "Medicamento controlado"
    },
    {
      "nomeMedicamento": "Insulina",
      "laboratorio": "Diversos",
      "dosagem": "100UI/mL",
      "descricaoBreve": "Hormônio para controle da glicose.",
      "descricao": "A Insulina é um hormônio utilizado para tratar a diabetes mellitus tipo 1 e tipo 2. Ela ajuda a regular os níveis de glicose no sangue, permitindo que as células absorvam e usem a glicose como fonte de energia. A dose de insulina varia de acordo com as necessidades individuais.",
      "precounid": "R$ 20,00",
      "tipo": "Medicamento controlado"
    }
  ]
  
  // Estado para armazenar os dados dos medicamentos
  const [medicamentos, setMedicamentos] = useState([]);
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Função para obter os dados do localStorage
  const getMedicamentosData = () => {
    const dadosArmazenados = JSON.parse(localStorage.getItem('MedicamentosData')) || [];
    setMedicamentos(dadosArmazenados);
  };

  // Chamada da função quando o componente monta
  useEffect(() => {
    getMedicamentosData();
  }, []);

 // Função para filtrar os medicamentos com base no termo de pesquisa
const allMedicamentos = [...medicamentos, ...medicamentosExemplos];

const filteredMedicamentos = allMedicamentos.filter(medicamento =>
  Object.values(medicamento).some(value =>
    value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);



  return (
    <Box container sx={{ p:2}}>
      <Grid container sx={{ p: 1 }} spacing={1}>
        <Grid item xs={12} sm={9}>
          <Box sx={{ display: 'flex' }}>
            <MedicationIcon
              sx={{
                color: 'rgba(0, 0, 0, 0.54)',
                fontSize: '30px',
                mr: 1
              }} />
            <Typography variant='subtitle1' sx={{ mt: 0.3 }} >
              Medicamentos
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Pesquisar medicamentos"
            type="search"
            size="small"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ p: 2 }} spacing={3}>
        {filteredMedicamentos.map((medicamento, index) => (
          <Grid item key={index} xs={12} sm={4}>
            <Paper elevation={1} >
              <Card sx={{ height: 'contain' }}>

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontSize={'16px'} >
                    {medicamento.nomeMedicamento}
                  </Typography>
                  <Typography variant='p' sx={{ maxHeight: '3.6em', height: '36px', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} color="text.secondary" gutterBottom>
                    Laboratório: {medicamento.laboratorio} | {medicamento.tipo}
                    
                  </Typography>
                  <Typography variant="body2" sx={{ maxHeight: '3.6em', height: '36px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {medicamento.descricaoBreve || "Descrição breve não disponível"}
                  </Typography>

                </CardContent >
                <CardActions sx={{ pb: 1, pt: 0, mt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="small">Ver mais</Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

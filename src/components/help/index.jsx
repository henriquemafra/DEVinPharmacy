import React from 'react';
import { Box, Typography, useMediaQuery, Link } from '@mui/material';
import LogoSMW from '../../assets/img/logoSMW.png'

export default function Help() {
  // Definindo se a tela é mobile
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box sx={{ p: 2, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex'}}>
      <img
                        style={{}}
                        alt="Logo"
                        src={LogoSMW}
                        width="50"
                        height="50"
                    /><Typography variant="h4" fontWeight="bold" sx={{ ml: 1, mt: 1 }}>
       Ajuda
      </Typography>
      </Box>
      <Typography variant="p" component='div' sx={{ mt: 2 }} color="text.secondary">
        Bem-vindo à seção de Ajuda do Medicament Management System. Aqui você encontrará informações detalhadas sobre como usar cada página e recurso do programa.
      </Typography>

      <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
        Página de Medicamentos
      </Typography>
      <Typography variant="body1">
        A página de Medicamentos permite que você gerencie e visualize os medicamentos cadastrados. Aqui estão algumas funcionalidades-chave:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">Listagem de Medicamentos: Nesta seção, você verá uma lista de todos os medicamentos cadastrados. Use a barra de pesquisa para encontrar medicamentos específicos com base em nome, laboratório, tipo, etc.</Typography>
        </li>
        <li>
          <Typography variant="body1">Cadastrar Novo Medicamento: Clique no botão "Cadastrar Novo" para adicionar um novo medicamento ao catálogo. Preencha todos os campos obrigatórios, como nome, laboratório e dosagem.</Typography>
        </li>
        <li>
          <Typography variant="body1">Editar Medicamento: Para editar informações de um medicamento existente, clique no botão de edição ao lado do medicamento na lista. Faça as alterações necessárias e clique em "Salvar" para confirmar.</Typography>
        </li>
        <li>
          <Typography variant="body1">Excluir Medicamento: Para remover um medicamento da lista, clique no botão de exclusão ao lado do medicamento. Confirme a exclusão na janela de confirmação.</Typography>
        </li>
      </ul>

      {/* Página de Farmácias */}
      <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
        Página de Farmácias
      </Typography>
      <Typography variant="body1">
        A página de Farmácias permite gerenciar e visualizar informações sobre farmácias cadastradas. Aqui estão algumas funcionalidades-chave:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">Listagem de Farmácias: Nesta seção, você verá uma lista de todas as farmácias cadastradas. Utilize a barra de pesquisa para encontrar farmácias específicas.</Typography>
        </li>
        <li>
          <Typography variant="body1">Cadastrar Nova Farmácia: Clique no botão "Cadastrar Nova" para adicionar uma nova farmácia à lista. Preencha os campos obrigatórios, como nome fantasia, razão social e CNPJ.</Typography>
        </li>
        <li>
          <Typography variant="body1">Visualizar Informações: Clique no ícone de visualização ao lado de uma farmácia para ver todas as informações detalhadas sobre a farmácia.</Typography>
        </li>
        <li>
          <Typography variant="body1">Excluir Farmácia: Para remover uma farmácia da lista, clique no botão de exclusão ao lado da farmácia. Confirme a exclusão na janela de confirmação.</Typography>
        </li>
      </ul>

      {/* Página do Mapa */}
      <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
        Página do Mapa
      </Typography>
      <Typography variant="body1">
        A página do Mapa exibe a localização das farmácias no mapa. Aqui estão algumas funcionalidades-chave:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">Mapa Interativo: A página do mapa apresenta um mapa interativo onde as farmácias cadastradas são marcadas com pinos.</Typography>
        </li>
        <li>
          <Typography variant="body1">Visualização de Detalhes: Ao clicar em um pino no mapa, uma janela pop-up será exibida com as informações da farmácia correspondente.</Typography>
        </li>
        <li>
          <Typography variant="body1">Exclusão de Farmácia: A partir da visualização de detalhes, é possível excluir uma farmácia usando o botão de exclusão.</Typography>
        </li>
      </ul>

      <Typography variant="h6" fontWeight="bold" mt={2} mb={1}>
        Ajuda
      </Typography>
      <Typography variant="body1">
        A seção "Ajuda" contém informações úteis sobre como usar o software:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            Manual de Ajuda: Você está lendo o manual de ajuda agora! Use esta seção para obter informações detalhadas sobre como usar cada parte do software.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Perguntas Frequentes: Aqui você pode encontrar respostas para perguntas comuns dos usuários.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Contato: Se você tiver algum problema ou dúvida que não foi abordada aqui, <Link href="mailto:suporte@medicationmanagement.com">entre em contato conosco</Link> usando as informações fornecidas.
          </Typography>
        </li>
      </ul>
      
    </Box>
  );
}

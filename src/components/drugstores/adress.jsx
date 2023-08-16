import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function Adress () {
      // UseState do viaCEP
      const [endereco, setEndereco] = useState({
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
    });
    // Cria um estado para o alerta de erro na inserção do CEP ao formulário.
    const [errorAlert, setErrorAlert] = useState(false);

    // Função para formatar o CEP enquanto o usuário digita
    const formatCep = (value) => {
        if (value) {
            return value
                .replace(/\D/g, '') // Remove caracteres não numéricos
                .replace(/(\d{5})(\d{1,3})/, '$1-$2'); // Adiciona o hífen após o 5º dígito
        }
        return value;
    };

    // Logica de implementação do autocomplete viaCEP
    const pesquisacep = async (valor) => {
        const cep = valor.replace(/\D/g, '');
    
        if (cep.length === 8) { // Verifique apenas o comprimento do CEP
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
    
                if (!data.erro) {
                    setEndereco({
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                    });
                } else {
                    setEndereco({
                        logradouro: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                    });
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 10000); // Utiliza função setTimeout para ocultar o alerta após 10 segundos
                }
            } catch (error) {
                console.error('Erro ao consultar CEP:', error);
            }
        }
    };
    return (
        <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorAlert}
                            id="cep"
                            label="CEP"
                            name="cep"
                            autoComplete="cep"
                            autoFocus
                            onBlur={(e) => pesquisacep(e.target.value)}
                            value={formatCep(endereco.cep)} // Formata o CEP antes de exibir
                            onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                        />
                        {errorAlert && (
                            <Typography component="p" color="error" sx={{ fontSize: '12px'}}>Informe um CEP válido por favor.</Typography>
                        )}
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
                            value={endereco.logradouro}
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
                            value={endereco.bairro}
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
                            value={endereco.cidade}
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
                            value={endereco.estado}
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
    )
}
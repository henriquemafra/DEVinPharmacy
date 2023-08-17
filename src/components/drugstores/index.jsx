import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography, useMediaQuery, Alert } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Button from '@mui/material/Button';
import React, { useState, useRef, useEffect } from 'react';

export default function NewDrugstore() {

    // MediaQuery para regular o botão de cadastro no mobile
    const isMobile = useMediaQuery('(max-width: 600px)');

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
    // Função para formatar o Celular e Telefone enquanto o usuário digita
    const formatPhoneNumber = (value) => {
        if (value) {
            return value
                .replace(/\D/g, '') // Remove caracteres não numéricos
                .replace(/(\d{2})(\d{1,5})(\d{1,4})/, '($1) $2-$3'); // Formata o número de telefone
        }
        return value;
    };
    // Função para formatar o CNPJ enquanto o usuário digita
    const formatCnpj = (value) => {
        if (value) {
            return value
                .replace(/\D/g, '') // Remove caracteres não numéricos
                .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // Formata o CNPJ
        }
        return value;
    };

    // Logica de implementação do autocomplete viaCEP
    const pesquisacep = async (valor) => {
        const cep = valor.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setEndereco({
                        ...endereco,
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                    });
                } else {
                    setEndereco({
                        ...endereco,
                        logradouro: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                    });
                    setErrorAlert(true);
                    setTimeout(() => {
                        setErrorAlert(false);
                    }, 10000);
                }
            } catch (error) {
                console.error('Erro ao consultar CEP:', error);
            }
        }
    };

    // Função para resetar os campos preenchidos via API CEP
    const handleFormReset = () => {
        setEndereco({
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: '',
        });
        formRef.current.reset();
    };
    // UseState para feedback de sucesso no submit
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // useRef para salvar o estado do form sem renderizar novamente
    const formRef = useRef(null);

    // Estado para armazenar as farmácias cadastradas
    const [farmacias, setFarmacias] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const novaFarmacia = {
            nomeFantasia: data.get('nomefantasia'),
            email: data.get('email'),
            telefone: data.get('telefone'),
            celular: data.get('celular'),
            razaoSocial: data.get('razaosocial'),
            cnpj: data.get('cnpj'),
            cep: data.get('cep'),
            logradouro: data.get('logradouro'),
            numero: data.get('numero'),
            bairro: data.get('bairro'),
            cidade: data.get('cidade'),
            estado: data.get('estado'),
            complemento: data.get('complemento'),
            latitude: data.get('latitude'),
            longitude: data.get('longitude'),
        };
        // Carregar dados existentes do localStorage
        const dadosArmazenados = JSON.parse(localStorage.getItem('farmaciasData')) || [];

        // Adicionar a nova farmácia ao array de farmácias existente
        const novasFarmacias = [...dadosArmazenados, novaFarmacia];

        // Armazenar o array atualizado no localStorage
        storeFarmaciasData(novasFarmacias);

        // Limpar os campos do formulário
        if (formRef.current) {
            formRef.current.reset();
        }

        // Limpar os campos de endereço
        handleFormReset();

        // Exibir feedback de sucesso
        setSubmitSuccess(true);
        console.log(novaFarmacia);
    };

    const storeFarmaciasData = (farmaciasData) => {
        localStorage.setItem('farmaciasData', JSON.stringify(farmaciasData));
    };


    // Usa API da openstreetmap para obter os dados aproximados de geolocalização através do CEP
    const obterGeolocalizacao = async (cep) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cep}`);
            const data = await response.json();

            if (data.length > 0) {
                return {
                    lat: data[0].lat,
                    lon: data[0].lon
                };
            } else {
                throw new Error('Nenhum resultado de geolocalização encontrado');
            }
        } catch (error) {
            throw new Error('Erro ao obter geolocalização');
        }
    };

    // UseEffect para atualizar a geolocalização quando o CEP mudar
    useEffect(() => {
        if (endereco.cep) {
            const formattedCep = endereco.cep.replace(/\D/g, '');

            obterGeolocalizacao(formattedCep)
                .then(result => {
                    setEndereco(prevEndereco => ({
                        ...prevEndereco,
                        latitude: result.lat,
                        longitude: result.lon
                    }));
                })
                .catch(error => {
                    console.error('Erro ao obter geolocalização:', error);
                });
        }
    }, [endereco.cep]);

    return (
        <Box sx={{ p: 2, overflow: 'hidden' }}>
            <Box component="form" validate="true" onSubmit={handleSubmit} ref={formRef} sx={{ px: 2, overflow: 'hidden' }}>
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <AddBusinessIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />

                    Identificação
                </Typography>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nomefantasia"
                            label="Nome Fantasia"
                            name="nomefantasia"
                            autoComplete="nomefantasia"
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
                            value={formatPhoneNumber(endereco.telefone)}
                            onChange={(e) => setEndereco({ ...endereco, telefone: e.target.value })}
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
                            value={formatPhoneNumber(endereco.celular)}
                            onChange={(e) => setEndereco({ ...endereco, celular: e.target.value })}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="razaosocial"
                            label="Razão social"
                            name="razaosocial"
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
                            name="cnpj"
                            autoComplete="CNPJ"
                            autoFocus
                            value={formatCnpj(endereco.cnpj)} // Aplicando a formatação
                            onChange={(e) => setEndereco({ ...endereco, cnpj: e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <LocationCityIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />
                    Endereço
                </Typography>
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
                            <Typography component="p" color="error" sx={{ fontSize: '12px' }}>Informe um CEP válido por favor.</Typography>
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
                <Typography component="h1" variant="h6" sx={{ my: 1 }}>
                    <GpsFixedIcon
                        sx={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            fontSize: '30px',
                            mx: 1
                        }} />
                    Geolocalização
                </Typography>
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
                            value={endereco.latitude}
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            value={endereco.longitude ?? ''}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoFocus
                        />
                    </Grid>
                </Grid>
                {submitSuccess && (
                    <Alert severity="success" sx={{ mt: 2, textAlign: 'center' }}>
                        Cadastro realizado com sucesso!
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
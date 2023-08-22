import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography, useMediaQuery, Paper, Alert } from '@mui/material';
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
    const pesquisaCep = async (valor) => {
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


    // Usa API da Google para obter os dados aproximados de geolocalização através do CEP
    const obterGeolocalizacao = async (endereco) => {
        try {
            const apiKey = 'AIzaSyB__bX2Rwc-3E7A9luN09-r7LetvLnINoo'; // remover após entrega do projeto.
            const formattedEndereco = encodeURIComponent(endereco);

            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedEndereco}&key=${apiKey}`);
            const data = await response.json();
            console.log(data)
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return {
                    lat: location.lat,
                    lon: location.lng
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
        <Box sx={{ p: 2, pl: 0, overflow: 'hidden', borderBottom: '1px solid rgba(0, 0, 0, 0.12);' }}>
            <Box component="form" validate="true" onSubmit={handleSubmit} ref={formRef} sx={{ overflow: 'hidden' }}>
                <Box sx={{ display: 'flex' }}>

                    <Typography variant='h4' fontWeight="bold" sx={{ mt: 1 }}>
                        Cadastrar
                    </Typography>
                </Box>
                <Typography variant='p' component="div" color='text.secondary' >Cadastro de nova farmácia.</Typography>
                <Box sx={{ display: 'flex', borderTop: '1px solid rgba(0, 0, 0, 0.12);' }}>
                    <Typography variant='h6' fontWeight="bold" sx={{ mt: 2, mb: -0.5 }} >
                        Identificação
                    </Typography>
                </Box>
                <Typography variant='p' sx={{ mb: 3 }} color='text.secondary'>Preencha adequadamente todos os campos,
                    caso necessário consulte o manual de ajuda.</Typography>
                <Paper
                    sx={{
                        pt: 1,
                        px: 5,
                        pb: 3,
                        mt: 3
                    }}
                >
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
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
                                sx={{ width: '100%' }}
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                sx={{ width: '100%' }}
                                id="telefone"
                                label="Telefone"
                                value={formatPhoneNumber(endereco.telefone)}
                                onChange={(e) => setEndereco({ ...endereco, telefone: e.target.value })}
                                name="telefone"
                                autoComplete="telefone"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="celular"
                                label="Celular"
                                name="celular"
                                autoComplete="celular"
                                value={formatPhoneNumber(endereco.celular)}
                                onChange={(e) => setEndereco({ ...endereco, celular: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="razaosocial"
                                label="Razão social"
                                name="razaosocial"
                                autoComplete="razão social"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="cnpj"
                                label="CNPJ"
                                name="cnpj"
                                autoComplete="CNPJ"
                                value={formatCnpj(endereco.cnpj)} // Aplicando a formatação
                                onChange={(e) => setEndereco({ ...endereco, cnpj: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Box sx={{ display: 'flex', }}>
                    <Typography variant='h6' fontWeight="bold" sx={{ mt: 2, mb: -0.5 }} >
                        Endereço
                    </Typography>
                </Box>
                <Typography variant='p' sx={{ mb: 3 }} color='text.secondary'>Preencha adequadamente todos os campos,
                    caso necessário consulte o manual de ajuda.</Typography>
                <Paper
                    sx={{
                        pt: 1,
                        px: 5,
                        pb: 3,
                        mt: 3
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                error={errorAlert}
                                id="cep"
                                label="CEP"
                                name="cep"
                                autoComplete="cep"
                                onBlur={(e) => pesquisaCep(e.target.value)}
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
                                sx={{ width: '100%' }}
                                id="logradouro"
                                label="Logradouro/Endereço"
                                name="logradouro"
                                autoComplete="logradouro"
                                value={endereco.logradouro ?? ''}
                                onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="numero"
                                label="Número"
                                name="numero"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="numero"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="bairro"
                                label="Bairro"
                                name="bairro"
                                autoComplete="bairro"
                                value={endereco.bairro}
                                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="cidade"
                                label="Cidade"
                                name="cidade"
                                autoComplete="cidade"
                                value={endereco.cidade}
                                onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '100%' }}
                                id="estado"
                                label="Estado"
                                name="estado"
                                autoComplete="estado"
                                value={endereco.estado}
                                onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                sx={{ width: '100%' }}
                                id="complemento"
                                label="Complemento"
                                name="complemento"
                                autoComplete="complemento"
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Box sx={{ display: 'flex', }}>
                    <Typography variant='h6' fontWeight="bold" sx={{ mt: 2, mb: -0.5 }} >
                        Geolocalização
                    </Typography>
                </Box>
                <Typography variant='p' sx={{ mb: 3 }} color='text.secondary'>Antes de finalizar o cadastro, confira se a coordenadas estão corretas.
                    Caso não saiba como realizar o teste <a style={{ textDecoration: 'none', color: '#04005D' }} target="_blank" href="https://support.google.com/maps/answer/18539?hl=pt-PT&co=GENIE.Platform%3DAndroid#:~:text=Ver%20as%20coordenadas%20de%20um%20lugar%201%20No,Na%20caixa%20de%20pesquisa%2C%20voc%C3%AA%20ver%C3%A1%20as%20coordenadas.">clique aqui</a>.</Typography>
                <Paper
                    sx={{
                        pt: 1,
                        px: 5,
                        pb: 3,
                        mt: 3
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                sx={{ width: '100%' }}
                                required
                                id="latitude"
                                label="Latitude"
                                name="latitude"
                                autoComplete="latitude"
                                value={endereco.latitude}
                                onChange={(e) => setEndereco({ ...endereco, latitude: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                sx={{ width: '100%' }}
                                required
                                id="longitude"
                                label="Longitude"
                                name="longitude"
                                autoComplete="longitude"
                                value={endereco.longitude}
                                onChange={(e) => setEndereco({ ...endereco, longitude: e.target.value })}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
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
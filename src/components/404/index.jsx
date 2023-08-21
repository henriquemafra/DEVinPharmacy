import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1" align="center" color="error">
        404
      </Typography>
      <Typography variant='h3' align='center'>
      A página que você procura não foi encontrada.
      </Typography>
      <Button text='Voltar'/>
    </Box>
  );
};

export default NotFoundPage;

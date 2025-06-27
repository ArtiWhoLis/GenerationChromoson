import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <Typography variant="h3" gutterBottom>
      Генератор расписания занятий
    </Typography>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      Современное PWA-приложение для автоматической генерации расписания с помощью генетического алгоритма.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="large"
      component={Link}
      to="/input"
      sx={{ mt: 4 }}
    >
      Начать генерацию
    </Button>
  </Box>
);

export default Home; 
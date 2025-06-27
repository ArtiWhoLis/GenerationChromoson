import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const About = () => (
  <Paper sx={{ p: 4, maxWidth: 700, margin: '32px auto' }}>
    <Typography variant="h5" gutterBottom>
      О приложении
    </Typography>
    <Typography variant="body1" paragraph>
      Это прогрессивное веб-приложение (PWA) предназначено для автоматической генерации расписания занятий с помощью генетического алгоритма (хромосом).
    </Typography>
    <Typography variant="body1" paragraph>
      Генетический алгоритм — это метод оптимизации, вдохновлённый процессами естественного отбора. В данном приложении он используется для поиска оптимального расписания с учётом заданных ограничений.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Автор: ФИО, 2024
    </Typography>
  </Paper>
);

export default About; 
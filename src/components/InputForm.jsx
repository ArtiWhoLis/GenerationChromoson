import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Grid, Paper, InputAdornment } from '@mui/material';
import SubjectIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
  const [subjects, setSubjects] = useState('Математика, Физика, Информатика');
  const [teachers, setTeachers] = useState('Иванов, Петров, Сидоров');
  const [rooms, setRooms] = useState('101, 102, 103');
  const [slots, setSlots] = useState('Пн 9:00, Пн 10:00, Вт 9:00');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/result', {
      state: {
        subjects,
        teachers,
        rooms,
        slots,
      },
    });
  };

  const fieldSx = {
    background: 'rgba(245, 247, 250, 0.95)',
    borderRadius: 3,
    transition: 'box-shadow 0.2s',
    boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.05)',
    '& .MuiOutlinedInput-root': {
      fontSize: '1.08rem',
      minHeight: 56,
      borderRadius: 3,
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#90caf9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
        boxShadow: '0 0 0 2px #1976d220',
      },
    },
    mb: 0.5,
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          maxWidth: 600,
          width: '100%',
          boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
          background: 'rgba(255,255,255,0.97)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 3, color: 'primary.main', letterSpacing: 1 }}
        >
          Ввод данных
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Заполните поля для генерации расписания
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3} columns={12} alignItems="stretch">
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
              <TextField
                label="Предметы"
                placeholder="Например: Математика, Физика, Информатика"
                fullWidth
                value={subjects}
                onChange={e => setSubjects(e.target.value)}
                helperText="Через запятую"
                variant="outlined"
                sx={{ ...fieldSx, minWidth: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SubjectIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
              <TextField
                label="Преподаватели"
                placeholder="Например: Иванов, Петров, Сидоров"
                fullWidth
                value={teachers}
                onChange={e => setTeachers(e.target.value)}
                helperText="Через запятую"
                variant="outlined"
                sx={{ ...fieldSx, minWidth: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
              <TextField
                label="Аудитории"
                placeholder="Например: 101, 102, 103"
                fullWidth
                value={rooms}
                onChange={e => setRooms(e.target.value)}
                helperText="Через запятую"
                variant="outlined"
                sx={{ ...fieldSx, minWidth: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RoomIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
              <TextField
                label="Временные слоты"
                placeholder="Например: Пн 9:00, Пн 10:00, Вт 9:00"
                fullWidth
                value={slots}
                onChange={e => setSlots(e.target.value)}
                helperText="Через запятую"
                variant="outlined"
                sx={{ ...fieldSx, minWidth: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  minWidth: 220,
                  maxWidth: 340,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mx: 'auto',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px) scale(1.03)',
                  },
                }}
              >
                Сгенерировать расписание
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default InputForm; 
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Stack } from '@mui/material';

// Генетический алгоритм для генерации расписания
function geneticScheduleStepwise(subjects, teachers, rooms, slots, generations = 50, populationSize = 40) {
  const subjArr = subjects.split(',').map(s => s.trim()).filter(Boolean);
  const teachArr = teachers.split(',').map(s => s.trim()).filter(Boolean);
  const roomArr = rooms.split(',').map(s => s.trim()).filter(Boolean);
  const slotArr = slots.split(',').map(s => s.trim()).filter(Boolean);
  if (!subjArr.length || !teachArr.length || !roomArr.length || !slotArr.length) return [];

  // Генерация одной хромосомы (расписания)
  function createChromosome() {
    return subjArr.map(subject => ({
      subject,
      teacher: teachArr[Math.floor(Math.random() * teachArr.length)],
      room: roomArr[Math.floor(Math.random() * roomArr.length)],
      slot: slotArr[Math.floor(Math.random() * slotArr.length)],
    }));
  }

  // Fitness: количество конфликтов (меньше — лучше)
  function fitness(chromosome) {
    let conflicts = 0;
    const slotTeacher = {};
    const slotRoom = {};
    chromosome.forEach(lesson => {
      const tKey = lesson.teacher + '|' + lesson.slot;
      const rKey = lesson.room + '|' + lesson.slot;
      if (slotTeacher[tKey]) conflicts++;
      else slotTeacher[tKey] = true;
      if (slotRoom[rKey]) conflicts++;
      else slotRoom[rKey] = true;
    });
    return -conflicts; // Чем больше, тем лучше (меньше конфликтов)
  }

  // Скрещивание двух хромосом
  function crossover(a, b) {
    const point = Math.floor(Math.random() * a.length);
    return a.map((item, i) => (i < point ? a[i] : b[i]));
  }

  // Мутация: случайно меняем учителя, аудиторию или слот у случайного занятия
  function mutate(chromosome) {
    const idx = Math.floor(Math.random() * chromosome.length);
    const field = ['teacher', 'room', 'slot'][Math.floor(Math.random() * 3)];
    const newChrom = chromosome.map((l, i) => ({ ...l }));
    if (field === 'teacher') newChrom[idx].teacher = teachArr[Math.floor(Math.random() * teachArr.length)];
    if (field === 'room') newChrom[idx].room = roomArr[Math.floor(Math.random() * roomArr.length)];
    if (field === 'slot') newChrom[idx].slot = slotArr[Math.floor(Math.random() * slotArr.length)];
    return newChrom;
  }

  // Инициализация популяции
  let population = Array.from({ length: populationSize }, createChromosome);
  let history = [{ population, best: population[0], fitness: fitness(population[0]) }];

  for (let gen = 0; gen < generations; gen++) {
    population.sort((a, b) => fitness(b) - fitness(a));
    if (fitness(population[0]) === 0) {
      history.push({ population, best: population[0], fitness: fitness(population[0]) });
      break;
    }
    const nextGen = [population[0], population[1]];
    while (nextGen.length < populationSize) {
      const parent1 = population[Math.floor(Math.random() * 10)];
      const parent2 = population[Math.floor(Math.random() * 10)];
      let child = crossover(parent1, parent2);
      if (Math.random() < 0.3) child = mutate(child);
      nextGen.push(child);
    }
    population = nextGen;
    history.push({ population, best: population[0], fitness: fitness(population[0]) });
  }
  return history;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjects = '', teachers = '', rooms = '', slots = '' } = location.state || {};
  const generations = 50;
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef();

  useEffect(() => {
    const h = geneticScheduleStepwise(subjects, teachers, rooms, slots, generations, 40);
    setHistory(h);
    setStep(0);
    setIsRunning(true);
  }, [subjects, teachers, rooms, slots]);

  useEffect(() => {
    if (!isRunning || !history.length || step >= history.length - 1) return;
    timerRef.current = setTimeout(() => setStep(s => s + 1), 120);
    return () => clearTimeout(timerRef.current);
  }, [step, isRunning, history]);

  if (!history.length) return null;
  const best = history[step].best;
  const fitness = -history[step].fitness;
  const done = step === history.length - 1;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper sx={{ p: 4, maxWidth: 800, width: '100%', borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
            Генерация расписания
          </Typography>
          <LinearProgress variant="determinate" value={100 * step / (history.length - 1)} sx={{ width: '100%', maxWidth: 400 }} />
          <Typography variant="body1" color="text.secondary">
            Поколение: <b>{step + 1}</b> / {history.length} &nbsp; | &nbsp; Конфликтов: <b>{fitness}</b>
          </Typography>
        </Stack>
        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Предмет</TableCell>
                <TableCell>Преподаватель</TableCell>
                <TableCell>Аудитория</TableCell>
                <TableCell>Время</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {best.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.teacher}</TableCell>
                  <TableCell>{row.room}</TableCell>
                  <TableCell>{row.slot}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          {!done && (
            <Button variant="outlined" color="secondary" onClick={() => { setStep(history.length - 1); setIsRunning(false); }}>
              Пропустить анимацию
            </Button>
          )}
          {done && (
            <Button variant="contained" color="primary" onClick={() => navigate('/input')}>
              Сгенерировать заново
            </Button>
          )}
          <Button variant="outlined" color="secondary" disabled>
            Скачать расписание
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Result; 
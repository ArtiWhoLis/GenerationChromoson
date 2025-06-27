import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Home from './components/Home';
import InputForm from './components/InputForm';
import Result from './components/Result';
import About from './components/About';

function App() {
  return (
    <Router>
      <AppBar position="fixed" sx={{ width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 0, mr: 2, textAlign: 'center' }}>
            Генератор расписания
          </Typography>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/input">Ввод данных</Button>
          <Button color="inherit" component={Link} to="/result">Результат</Button>
          <Button color="inherit" component={Link} to="/about">О приложении</Button>
        </Toolbar>
      </AppBar>
      <Container disableGutters maxWidth={false} sx={{ width: '100vw', height: '100vh', p: 0 }}>
        <Box sx={{
          minHeight: 'calc(100vh - 64px)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '64px',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;

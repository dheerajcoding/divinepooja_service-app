import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', backgroundColor: '#FFF8DC' }}>
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" sx={{ fontSize: '5rem', color: '#FF9933', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: '#2C1810' }}>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#5D4E37' }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button component={Link} to="/" variant="contained" size="large">
        Back to Home
      </Button>
    </Container>
  </Box>
);

export default NotFound;

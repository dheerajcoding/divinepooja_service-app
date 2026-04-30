import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const PoojaList = () => {
  const { poojas: dummyPoojas } = useData();
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF8DC', py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 4,
            color: '#FF9933',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          🕉️ Sacred Pooja Services
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: '#5D4E37' }}>
          Choose from our collection of divine ceremonies
        </Typography>
        <Grid container spacing={4}>
          {dummyPoojas.map((pooja) => (
            <Grid item key={pooja.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  },
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={pooja.image}
                  alt={pooja.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
                    {pooja.name}
                  </Typography>
                  <Chip
                    label={pooja.category}
                    sx={{
                      mb: 2,
                      backgroundColor: '#FFD700',
                      color: '#2C1810',
                      fontWeight: 'bold',
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {pooja.description}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold', mb: 1 }}>
                    ₹{pooja.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Duration: {pooja.duration} hours
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/pooja/${pooja.id}`}
                      sx={{
                        flex: 1,
                        borderColor: '#FF9933',
                        color: '#FF9933',
                        '&:hover': {
                          borderColor: '#FFD700',
                          backgroundColor: '#FFF8DC',
                        },
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/booking/${pooja.id}`}
                      sx={{
                        flex: 1,
                        backgroundColor: '#FF9933',
                        '&:hover': {
                          backgroundColor: '#FFD700',
                          color: '#2C1810',
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PoojaList;
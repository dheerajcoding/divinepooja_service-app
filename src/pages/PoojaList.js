import React, { useState, useMemo } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Chip, TextField, InputAdornment, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useData } from '../context/DataContext';

const PoojaList = () => {
  const { poojas: dummyPoojas } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set(dummyPoojas.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [dummyPoojas]);

  const filteredPoojas = useMemo(() => {
    return dummyPoojas.filter((pooja) => {
      const matchesCategory = selectedCategory === 'All' || pooja.category === selectedCategory;
      const matchesSearch =
        pooja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pooja.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dummyPoojas, selectedCategory, searchQuery]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: 6 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3rem' },
            }}
          >
            🕉️ Sacred Pooja Catalog
          </Typography>
          <Typography variant="h6" sx={{ color: '#664E3D', maxWidth: 650, mx: 'auto', fontWeight: 500 }}>
            Choose from our curated collection of Vedic ceremonies performed by certified priests at your home.
          </Typography>
        </Box>

        {/* Search and Filters Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2.5,
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 5,
            p: 2.5,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(229, 169, 16, 0.3)',
            boxShadow: '0 8px 24px rgba(198, 81, 2, 0.08)',
          }}
        >
          {/* Category Chips */}
          <Box
            className="mobile-scroll-row"
            sx={{
              display: 'flex',
              gap: 1,
              width: { xs: '100%', md: 'auto' },
              overflowX: { xs: 'auto', md: 'visible' },
              flexWrap: { xs: 'nowrap', md: 'wrap' },
              justifyContent: { xs: 'flex-start', md: 'flex-start' },
              py: 0.5,
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    fontWeight: 600,
                    px: { xs: 1.2, sm: 1.5 },
                    py: 1.8,
                    borderRadius: 50,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.25s ease',
                    backgroundColor: isSelected ? '#FF7700' : 'rgba(255, 119, 0, 0.08)',
                    color: isSelected ? '#FFFFFF' : '#331C10',
                    border: isSelected ? '1px solid #C65102' : '1px solid transparent',
                    boxShadow: isSelected ? '0 4px 12px rgba(255, 119, 0, 0.35)' : 'none',
                    '&:hover': {
                      backgroundColor: isSelected ? '#E66A00' : 'rgba(255, 119, 0, 0.16)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                />
              );
            })}
          </Box>

          {/* Search Box */}
          <TextField
            size="small"
            placeholder="Search poojas, havan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#FF7700' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: 50, backgroundColor: '#FFFDF9', width: '100%', minWidth: { xs: '100%', sm: 260 } },
            }}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          />
        </Box>

        {/* Pooja Cards Grid */}
        {filteredPoojas.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ color: '#664E3D', mb: 2 }}>
              No poojas found matching your search.
            </Typography>
            <Button variant="outlined" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Clear Filters
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3.5}>
            {filteredPoojas.map((pooja) => (
              <Grid item key={pooja.id} xs={12} sm={6} md={4}>
                <Card
                  className="glass-card"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    position: 'relative',
                  }}
                >
                  {pooja.isOffer && (
                    <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                      <Chip
                        label="🔥 POPULAR"
                        className="shimmer-badge"
                        size="small"
                        sx={{ fontWeight: 'bold', borderRadius: 2 }}
                      />
                    </Box>
                  )}

                  <Box
                    className="card-zoom-media"
                    sx={{
                      height: 215,
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: '#1E110A',
                    }}
                  >
                    {/* Ambient blurred backdrop so vertical/square images never look awkward or cut */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: -12,
                        backgroundImage: `url(${pooja.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        filter: 'blur(16px) brightness(0.65)',
                        transform: 'scale(1.15)',
                        opacity: 0.9,
                      }}
                    />
                    <CardMedia
                      component="img"
                      image={pooja.image}
                      alt={pooja.name}
                      sx={{
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                        zIndex: 1,
                        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={pooja.category}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(229, 169, 16, 0.15)',
                          color: '#C65102',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                        }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', color: '#664E3D', fontSize: '0.85rem' }}>
                        <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: '#FF7700' }} />
                        <span>{pooja.duration} hrs</span>
                      </Box>
                    </Box>

                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        fontFamily: '"Cinzel", serif',
                        color: '#1E110A',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        minHeight: 32,
                        mt: 0.5,
                      }}
                    >
                      {pooja.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Rating value={pooja.rating} precision={0.1} readOnly size="small" sx={{ mr: 1, color: '#E5A910' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#C65102', mr: 0.5 }}>
                        {pooja.rating}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#8C6D53' }}>
                        ({pooja.reviews})
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#664E3D',
                        mb: 2.5,
                        lineHeight: 1.6,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {pooja.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2.5 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Cinzel", serif',
                          color: '#C65102',
                          fontWeight: 800,
                          mr: 1.5,
                        }}
                      >
                        ₹{pooja.price}
                      </Typography>
                      {pooja.originalPrice > pooja.price && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#8C6D53' }}>
                          ₹{pooja.originalPrice}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/pooja/${pooja.id}`}
                        sx={{
                          flex: 1,
                          borderRadius: 50,
                          borderColor: '#FF7700',
                          color: '#FF7700',
                          py: 1,
                          '&:hover': {
                            borderColor: '#C65102',
                            backgroundColor: 'rgba(255, 119, 0, 0.08)',
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
                          flex: 1.3,
                          borderRadius: 50,
                          py: 1,
                          fontWeight: 700,
                        }}
                      >
                        🕉️ Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default PoojaList;
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button, Chip, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useData } from '../context/DataContext';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { siteConfig } from '../config';
import { buildInquiryMessage, openWhatsApp } from '../utils/inquiry';

const handleBookPackage = (pkg) => {
  openWhatsApp(
    buildInquiryMessage({
      subject: `Package booking: ${pkg.name}`,
      poojaName: `${pkg.name} (${pkg.poojas.join(', ')})`,
      price: pkg.discountedPrice,
      message: `I would like to book the ${pkg.name}.`,
    })
  );
};

const Packages = () => {
  const { packages } = useData();
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: 6 }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            🏆 Special Pooja Packages
          </Typography>
          <Typography variant="h6" sx={{ color: '#664E3D', maxWidth: 680, mx: 'auto', fontWeight: 500 }}>
            Save more with our curated, all-inclusive pooja bundles designed to cover every detail of your auspicious rituals.
          </Typography>
        </Box>

        {/* Packages Grid */}
        <Grid container spacing={{ xs: 4, md: 4 }} sx={{ mb: 8, pt: { xs: 4, sm: 5 } }}>
          {packages.map((pkg, idx) => {
            const isFeatured = pkg.isPopular === true || pkg.popular === true || (!packages.some(p => p.isPopular || p.popular) && idx === 1);
            return (
              <Grid item key={pkg.id} xs={12} md={6} lg={4}>
                <Card
                  className="glass-card"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'visible !important',
                    border: isFeatured ? '2.5px solid #FF7700' : '1px solid rgba(229, 169, 16, 0.3)',
                    transform: isFeatured ? { md: 'scale(1.03)' } : 'none',
                    zIndex: isFeatured ? 5 : 1,
                    boxShadow: isFeatured ? '0 12px 35px rgba(255, 119, 0, 0.22)' : '0 8px 24px rgba(198, 81, 2, 0.08)',
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  {isFeatured && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: -15, sm: -17 },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 30,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Box
                        className="shimmer-badge"
                        sx={{
                          px: 2.5,
                          py: 0.65,
                          borderRadius: '50px',
                          fontSize: { xs: '0.78rem', sm: '0.84rem' },
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          boxShadow: '0 6px 20px rgba(255, 119, 0, 0.65)',
                          border: '2.5px solid #FFFFFF',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.8,
                          color: '#FFFFFF',
                        }}
                      >
                        <span>⭐</span> MOST POPULAR
                      </Box>
                    </Box>
                  )}

                  <Box
                    sx={{
                      height: 6,
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                      background: isFeatured
                        ? 'linear-gradient(90deg, #FF7700 0%, #E5A910 100%)'
                        : 'linear-gradient(90deg, #E5A910 0%, #FFD966 100%)',
                    }}
                  />

                  <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Cinzel", serif',
                          color: '#1E110A',
                          fontWeight: 700,
                          fontSize: '1.35rem',
                        }}
                      >
                        {pkg.name}
                      </Typography>
                      <Chip label={`Save ₹${pkg.savings}`} color="error" size="small" sx={{ fontWeight: 'bold' }} />
                    </Box>

                    <Typography variant="body2" sx={{ mb: 3, color: '#664E3D', lineHeight: 1.6 }}>
                      {pkg.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C6D53', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.2 }}>
                        Included Ceremonies:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {pkg.poojas.map((pooja, index) => (
                          <Chip
                            key={index}
                            label={pooja}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 119, 0, 0.08)',
                              color: '#C65102',
                              fontWeight: 600,
                              borderRadius: 2,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: '"Cinzel", serif',
                          color: '#C65102',
                          fontWeight: 800,
                          mr: 1.5,
                        }}
                      >
                        ₹{pkg.discountedPrice}
                      </Typography>
                      <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#8C6D53' }}>
                        ₹{pkg.originalPrice}
                      </Typography>
                    </Box>

                    <List dense sx={{ mb: 4, flexGrow: 1 }}>
                      {pkg.features.map((feature, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.6 }}>
                          <CheckCircleOutlineIcon sx={{ color: '#25D366', fontSize: 19, mr: 1.2 }} />
                          <ListItemText primary={feature} primaryTypographyProps={{ style: { fontSize: '0.92rem', color: '#331C10' } }} />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleBookPackage(pkg)}
                      startIcon={<WhatsAppIcon />}
                      sx={{
                        backgroundColor: '#25D366',
                        color: 'white',
                        fontWeight: 700,
                        py: 1.4,
                        borderRadius: 50,
                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                        '&:hover': {
                          backgroundColor: '#1ebe5d',
                          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.55)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Book on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Why Choose a Package Paper */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 6 },
            borderRadius: { xs: 3, sm: 5 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 248, 235, 0.95) 0%, rgba(255, 238, 204, 0.85) 100%)',
            border: '2px solid rgba(229, 169, 16, 0.4)',
            boxShadow: '0 12px 32px rgba(198, 81, 2, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 700,
              fontSize: { xs: '1.35rem', sm: '1.75rem', md: '2.1rem' },
            }}
          >
            🕉️ Need a Custom Family Pooja Arrangement?
          </Typography>
          <Typography variant="body1" sx={{ color: '#664E3D', maxWidth: 680, mx: 'auto', mb: 3.5, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
            We organize multi-day havans, wedding rituals, and complex Vedic pujas tailored to your ancestral customs.
          </Typography>
          <Button
            variant="contained"
            component="a"
            href={`tel:${siteConfig.contact.phoneIntl}`}
            startIcon={<PhoneIcon />}
            sx={{
              background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
              color: 'white',
              fontWeight: 700,
              px: { xs: 2.5, sm: 4 },
              py: 1.5,
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              borderRadius: 50,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: 360, sm: 'none' },
              boxShadow: '0 6px 20px rgba(255, 119, 0, 0.4)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255, 119, 0, 0.6)',
              },
            }}
          >
            Speak With Pandit Ji: {siteConfig.contact.phone}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Packages;
import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box, Paper, Chip, Rating, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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

const Home = () => {
  const { poojas: dummyPoojas, testimonials, packages, stats } = useData();
  const popularPoojas = dummyPoojas.filter(pooja => pooja.isPopular);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF8DC' }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          mb: 6,
          background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
          color: 'white',
          textAlign: 'center',
          borderRadius: 0,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          🕉️ Divine Pooja Services
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
          Experience spiritual bliss with our authentic pooja ceremonies
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', px: { xs: 2, md: 0 } }}>
          Book sacred rituals performed by experienced priests in the comfort of your home
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/poojas"
            sx={{
              backgroundColor: '#FFD700',
              color: '#2C1810',
              fontWeight: 'bold',
              px: { xs: 3, md: 4 },
              py: 1.5,
              fontSize: { xs: '0.9rem', md: '1rem' },
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: '#FFA500',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              },
            }}
          >
            🕉️ Book Pooja Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/packages"
            sx={{
              borderColor: '#FFD700',
              color: '#FFD700',
              fontWeight: 'bold',
              px: { xs: 3, md: 4 },
              py: 1.5,
              fontSize: { xs: '0.9rem', md: '1rem' },
              borderWidth: 2,
              '&:hover': {
                backgroundColor: '#FFD700',
                color: '#2C1810',
                borderColor: '#FFD700',
                transform: 'translateY(-2px)',
              },
            }}
          >
            📦 View Special Packages
          </Button>
        </Box>
      </Paper>

      <Container maxWidth="lg">
        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)' }}>
              <AccountBalanceIcon sx={{ fontSize: 40, color: '#FF9933', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
                {stats.totalPoojas.toLocaleString()}+
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                Poojas Performed
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)' }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#FF9933', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
                {stats.happyCustomers.toLocaleString()}+
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                Happy Customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)' }}>
              <StarIcon sx={{ fontSize: 40, color: '#FF9933', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
                {stats.experiencedPriests}+
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                Expert Priests
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)' }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: '#FF9933', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
                {stats.yearsOfService}+
              </Typography>
              <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                Years of Service
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Special Offers */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#CC6600', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          🔥 Special Offers
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {packages.slice(0, 2).map((pkg) => (
            <Grid item key={pkg.id} xs={12} md={6}>
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)', border: '2px solid #FFD700' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalOfferIcon sx={{ color: '#FF9933', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold' }}>
                      {pkg.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, color: '#5D4E37' }}>
                    {pkg.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {pkg.poojas.map((pooja, index) => (
                      <Chip key={index} label={pooja} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mr: 2 }}>
                      ₹{pkg.discountedPrice}
                    </Typography>
                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#8B4513' }}>
                      ₹{pkg.originalPrice}
                    </Typography>
                    <Chip label={`Save ₹${pkg.savings}`} color="error" size="small" sx={{ ml: 2 }} />
                  </Box>
                  <List dense>
                    {pkg.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemText primary={`✓ ${feature}`} />
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="contained" fullWidth onClick={() => handleBookPackage(pkg)} startIcon={<WhatsAppIcon />} sx={{ mt: 2, backgroundColor: '#25D366', '&:hover': { backgroundColor: '#1ebe5d' } }}>
                    Book Package
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Popular Poojas */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#CC6600', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          ⭐ Popular Poojas - Book Now!
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {popularPoojas.map((pooja) => (
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
                  position: 'relative',
                  border: '2px solid #FFD700',
                }}
              >
                {pooja.isOffer && (
                  <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    <Chip label="🔥 LIMITED TIME" color="error" size="small" sx={{ fontWeight: 'bold' }} />
                  </Box>
                )}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={pooja.rating} readOnly size="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {pooja.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                      ({pooja.reviews})
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#5D4E37', mb: 2 }}>
                    {pooja.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#B8860B', fontWeight: 'bold', mr: 2 }}>
                      ₹{pooja.price}
                    </Typography>
                    {pooja.originalPrice > pooja.price && (
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#8B4513' }}>
                        ₹{pooja.originalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2, color: '#5D4E37' }}>
                    <strong>Priest:</strong> {pooja.priest} ({pooja.experience})
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(255,153,51,0.3)',
                        '&:hover': {
                          backgroundColor: '#FFD700',
                          color: '#2C1810',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 12px rgba(255,153,51,0.4)',
                        },
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

        {/* Urgent Call to Action */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 4, md: 6 },
            mb: 6,
            background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
            color: 'white',
            textAlign: 'center',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            🕉️ Book Your Pooja Today!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Don't wait! Limited slots available. Experience divine blessings in the comfort of your home.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FFD700' }}>⚡</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Instant Booking</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FFD700' }}>🏠</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Home Service</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FFD700' }}>🙏</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Expert Priests</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/poojas"
              sx={{
                backgroundColor: '#FFD700',
                color: '#2C1810',
                fontWeight: 'bold',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                },
              }}
            >
              🕉️ Book Pooja Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/packages"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#FF9933',
                  borderColor: 'white',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              📦 View Packages
            </Button>
          </Box>
        </Paper>

        {/* Testimonials */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#CC6600', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          💬 Happy Devotees Share Their Experience
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} md={4}>
              <Card sx={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
                borderRadius: 3,
                border: '2px solid #FFD700',
                position: 'relative',
                '&::before': {
                  content: '"🕉️"',
                  position: 'absolute',
                  top: -10,
                  left: 20,
                  backgroundColor: '#FF9933',
                  color: 'white',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }
              }}>
                <CardContent sx={{ p: 3, pt: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#FF9933', mr: 2 }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1B365D' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                        {testimonial.location}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic', color: '#2C1810', lineHeight: 1.6 }}>
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5D4E37' }}>
                    {testimonial.pooja} • {testimonial.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)',
            borderRadius: 4,
            mb: 4,
            border: '3px solid #FFD700',
            position: 'relative',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#CC6600', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            🕉️ Ready to Experience Divine Blessings?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#2C1810' }}>
            Join 892+ satisfied devotees who have found peace and prosperity through our sacred services
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
            <Chip
              label="⚡ Same Day Service Available"
              sx={{
                backgroundColor: '#FF9933',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 2,
                py: 1
              }}
            />
            <Chip
              label="🏠 Home Temple Setup"
              sx={{
                backgroundColor: '#FFD700',
                color: '#2C1810',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 2,
                py: 1
              }}
            />
            <Chip
              label="🙏 Expert Vedic Priests"
              sx={{
                backgroundColor: '#FF9933',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 2,
                py: 1
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              to="/poojas"
              sx={{
                backgroundColor: '#FF9933',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                boxShadow: '0 4px 8px rgba(255,153,51,0.3)',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  color: '#2C1810',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(255,153,51,0.4)',
                },
              }}
            >
              🕉️ Book Your Pooja Now
            </Button>
            <Button
              variant="outlined"
              component="a"
              href={`tel:${siteConfig.contact.phoneIntl}`}
              startIcon={<PhoneIcon />}
              sx={{
                borderColor: '#FF9933',
                color: '#FF9933',
                fontWeight: 'bold',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#FFD700',
                  backgroundColor: '#FFF8DC',
                  color: '#FF9933',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Call {siteConfig.contact.phone}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
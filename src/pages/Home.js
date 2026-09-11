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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8' }}>
      {/* Dynamic Spiritual Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 7, md: 11 },
          pb: { xs: 8, md: 12 },
          mb: 7,
          background: 'linear-gradient(145deg, #1E110A 0%, #351908 35%, #7A3100 75%, #C65102 100%)',
          color: 'white',
          textAlign: 'center',
          borderBottom: '3px solid #E5A910',
          boxShadow: '0 12px 36px rgba(0,0,0,0.22)',
        }}
      >
        {/* Ambient Radial Aura Glow */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '320px', md: '650px' },
            height: { xs: '320px', md: '650px' },
            background: 'radial-gradient(circle, rgba(255, 119, 0, 0.28) 0%, rgba(229, 169, 16, 0.12) 50%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Floating Sacred Pill Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: { xs: 1.8, sm: 2.6 },
              py: { xs: 0.6, sm: 0.9 },
              mb: 3,
              maxWidth: '100%',
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(229, 169, 16, 0.45)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            }}
            className="floating-element"
          >
            <span style={{ fontSize: '1.1rem', filter: 'drop-shadow(0 0 5px #FFD700)' }}>🪔</span>
            <Typography variant="body2" sx={{ color: '#FFD966', fontWeight: 600, fontSize: { xs: '0.78rem', sm: '0.88rem' }, letterSpacing: '0.03em' }}>
              Authentic Vedic Rituals • Certified Pandits • Doorstep Samagri
            </Typography>
          </Box>

          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 800,
              fontSize: { xs: '1.85rem', sm: '2.8rem', md: '3.6rem', lg: '4.2rem' },
              lineHeight: 1.18,
              textShadow: '0 4px 20px rgba(0,0,0,0.45)',
              color: '#FFFFFF',
              mb: 2.2,
            }}
          >
            🕉️ <span className="gold-gradient-light">{siteConfig.brand.name}</span>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 500,
              mb: 2,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.45rem' },
              color: '#FFE4B5',
              textShadow: '0 2px 6px rgba(0,0,0,0.35)',
            }}
          >
            Experience Spiritual Bliss With Authentic Vedic Pooja Ceremonies
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Outfit", sans-serif',
              mb: 4,
              fontSize: { xs: '0.95rem', md: '1.15rem' },
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: 720,
              mx: 'auto',
              lineHeight: 1.65,
            }}
          >
            Book experienced pandit ji for home poojas, griha pravesh, satyanarayan katha, havan, and festival rituals with complete samagri arrangements.
          </Typography>

          {/* Interactive CTA Buttons */}
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 }, justifyContent: 'center', flexWrap: 'wrap', mb: 4.5, width: '100%' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/poojas"
              sx={{
                background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                px: { xs: 3, md: 4.5 },
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 340, sm: 'none' },
                borderRadius: 50,
                boxShadow: '0 6px 22px rgba(255, 119, 0, 0.55)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E66A00 0%, #C6920D 100%)',
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 10px 28px rgba(255, 119, 0, 0.7)',
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
                fontWeight: 700,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                px: { xs: 3, md: 4 },
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 340, sm: 'none' },
                borderRadius: 50,
                borderWidth: 2,
                backgroundColor: 'rgba(255, 215, 0, 0.08)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  color: '#1E110A',
                  borderColor: '#FFD700',
                  borderWidth: 2,
                  transform: 'translateY(-3px) scale(1.02)',
                },
              }}
            >
              📦 View Special Packages
            </Button>
          </Box>

          {/* Feature Highlights Pills */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, md: 2 },
              justifyContent: 'center',
              flexWrap: 'wrap',
              pt: 2.5,
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            {['⭐ 4.9/5 (1,200+ Families)', '🪔 Complete Samagri', '📞 WhatsApp Confirmation', '⚡ Same-Day Booking'].map((badge, idx) => (
              <Chip
                key={idx}
                label={badge}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFF8DC',
                  fontWeight: 600,
                  fontSize: { xs: '0.76rem', sm: '0.84rem' },
                  py: { xs: 1.4, sm: 1.8 },
                  border: '1px solid rgba(255, 215, 0, 0.25)',
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Section with Glassmorphic Elevation */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            { icon: <AccountBalanceIcon sx={{ fontSize: 32, color: '#FF7700' }} />, value: `${stats.totalPoojas.toLocaleString()}+`, label: 'Poojas Performed' },
            { icon: <PeopleIcon sx={{ fontSize: 32, color: '#FF7700' }} />, value: `${stats.happyCustomers.toLocaleString()}+`, label: 'Happy Devotees' },
            { icon: <StarIcon sx={{ fontSize: 32, color: '#FF7700' }} />, value: `${stats.experiencedPriests}+`, label: 'Expert Priests' },
            { icon: <AccessTimeIcon sx={{ fontSize: 32, color: '#FF7700' }} />, value: `${stats.yearsOfService}+`, label: 'Years Of Devotion' },
          ].map((stat, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <Box
                className="glass-card"
                sx={{
                  p: { xs: 2, sm: 2.8, md: 3.2 },
                  textAlign: 'center',
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 48, sm: 56, md: 60 },
                    height: { xs: 48, sm: 56, md: 60 },
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 119, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 700,
                    color: '#C65102',
                    mb: 0.5,
                    fontSize: { xs: '1.45rem', sm: '1.8rem', md: '2.2rem' },
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#664E3D', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Special Offers Section */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#1E110A',
            }}
          >
            🔥 Special Curated Packages
          </Typography>
          <Typography variant="body1" sx={{ color: '#664E3D', maxWidth: 650, mx: 'auto' }}>
            Complete ritual packages designed for all-inclusive convenience with maximum savings.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 4 }} sx={{ mb: 8, pt: { xs: 4, sm: 5 } }}>
          {packages.slice(0, 2).map((pkg, idx) => {
            const isFeatured = pkg.isPopular === true || pkg.popular === true || (!packages.some(p => p.isPopular || p.popular) && idx === 1);
            return (
              <Grid item key={pkg.id} xs={12} md={6}>
                <Card
                  className="glass-card"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    border: isFeatured ? '2.5px solid #FF7700' : '1.5px solid rgba(229, 169, 16, 0.35)',
                    position: 'relative',
                    overflow: 'visible !important',
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
                  <CardContent sx={{ p: { xs: 3, sm: 4 }, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalOfferIcon sx={{ color: '#FF7700', mr: 1 }} />
                      <Typography variant="h5" sx={{ color: '#1E110A', fontWeight: 'bold' }}>
                        {pkg.name}
                      </Typography>
                    </Box>
                    <Chip label={`Save ₹${pkg.savings}`} color="error" size="small" sx={{ fontWeight: 'bold' }} />
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2.5, color: '#664E3D', lineHeight: 1.6 }}>
                    {pkg.description}
                  </Typography>

                  <Box sx={{ mb: 2.5 }}>
                    {pkg.poojas.map((pooja, index) => (
                      <Chip
                        key={index}
                        label={pooja}
                        size="small"
                        sx={{
                          mr: 1,
                          mb: 1,
                          backgroundColor: 'rgba(255, 119, 0, 0.08)',
                          color: '#C65102',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2.5 }}>
                    <Typography variant="h4" sx={{ color: '#C65102', fontWeight: 800, mr: 2, fontFamily: '"Cinzel", serif' }}>
                      ₹{pkg.discountedPrice}
                    </Typography>
                    <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#8C6D53' }}>
                      ₹{pkg.originalPrice}
                    </Typography>
                  </Box>

                  <List dense sx={{ mb: 3 }}>
                    {pkg.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.6 }}>
                        <CheckCircleOutlineIcon sx={{ color: '#25D366', fontSize: 20, mr: 1 }} />
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

        {/* Popular Poojas Section */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#1E110A',
            }}
          >
            ⭐ Most Requested Poojas
          </Typography>
          <Typography variant="body1" sx={{ color: '#664E3D', maxWidth: 650, mx: 'auto' }}>
            Performed with strict adherence to Vedic scriptures by verified, experienced priests.
          </Typography>
        </Box>

        <Grid container spacing={3.5} sx={{ mb: 8 }}>
          {popularPoojas.map((pooja) => (
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
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                      fontFamily: '"Cinzel", serif',
                      color: '#1E110A',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      minHeight: 32,
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

                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
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

                  <Typography variant="caption" sx={{ mb: 2.5, color: '#8C6D53', display: 'block' }}>
                    <strong>Pandit:</strong> {pooja.priest} • {pooja.experience}
                  </Typography>

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

        {/* Dynamic Urgent Highlight Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.8, sm: 4, md: 6 },
            mb: 8,
            background: 'linear-gradient(135deg, #1E110A 0%, #351908 50%, #7A3100 100%)',
            color: 'white',
            textAlign: 'center',
            borderRadius: { xs: 3, sm: 5 },
            border: '2px solid rgba(229, 169, 16, 0.4)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#FFD966',
              fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem' },
            }}
          >
            🕉️ Sacred Blessings For Your Home & Family
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: 650, mx: 'auto', fontSize: { xs: '0.92rem', md: '1.05rem' } }}>
            Book your auspicious muhurat in advance. Experience genuine Vedic chanting and positive divine vibrations.
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
            {[
              { emoji: '⚡', title: 'Instant Booking', desc: 'Confirm slot in 2 minutes' },
              { emoji: '🏠', title: 'Doorstep Pooja', desc: 'Pandit comes to your home' },
              { emoji: '🪔', title: 'Pure Samagri', desc: 'Authentic pooja materials' },
            ].map((item, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Box
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 0.5, fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>{item.emoji}</Typography>
                  <Typography variant="h6" sx={{ color: '#FFD966', fontWeight: 700, mb: 0.5, fontSize: { xs: '1rem', sm: '1.15rem' } }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.88rem' }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/poojas"
              sx={{
                background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 340, sm: 'none' },
                borderRadius: 50,
                boxShadow: '0 6px 20px rgba(255, 119, 0, 0.5)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 119, 0, 0.7)',
                },
              }}
            >
              🕉️ Book Your Pooja
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/packages"
              sx={{
                borderColor: '#FFD700',
                color: '#FFD700',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 340, sm: 'none' },
                borderRadius: 50,
                borderWidth: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.15)',
                  borderColor: '#FFD700',
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              📦 View All Packages
            </Button>
          </Box>
        </Paper>

        {/* Elevated Professional Testimonials Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.2,
                py: 0.7,
                mb: 2,
                borderRadius: 50,
                backgroundColor: 'rgba(255, 119, 0, 0.09)',
                border: '1px solid rgba(229, 169, 16, 0.35)',
              }}
            >
              <VerifiedIcon sx={{ fontSize: 18, color: '#25D366' }} />
              <Typography variant="caption" sx={{ color: '#C65102', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                100% Verified Devotee Experiences
              </Typography>
            </Box>

            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 800,
                color: '#1E110A',
                fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' },
              }}
            >
              🕉️ Words of Faith & Devotion
            </Typography>
            <Typography variant="body1" sx={{ color: '#664E3D', maxWidth: 700, mx: 'auto', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
              Read authentic feedback from families who welcomed divine blessings and certified pandit ji into their homes.
            </Typography>

            {/* Trust Rating Summary Bar */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: { xs: 1.5, sm: 3 },
                flexWrap: 'wrap',
                justifyContent: 'center',
                mt: 3,
                p: { xs: 1.5, sm: 2 },
                px: { xs: 2.5, sm: 3.5 },
                borderRadius: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid rgba(229, 169, 16, 0.35)',
                boxShadow: '0 6px 20px rgba(198, 81, 2, 0.08)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={5} readOnly size="small" sx={{ color: '#E5A910' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E110A' }}>
                  4.9 / 5.0
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#8C6D53', display: { xs: 'none', sm: 'inline' } }}>|</Typography>
              <Typography variant="caption" sx={{ color: '#664E3D', fontWeight: 600 }}>
                ⭐ 1,200+ Blessed Families
              </Typography>
              <Typography variant="caption" sx={{ color: '#8C6D53', display: { xs: 'none', sm: 'inline' } }}>|</Typography>
              <Typography variant="caption" sx={{ color: '#25D366', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> 100% Verified Rituals
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3.5}>
            {testimonials.map((testimonial) => (
              <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
                <Card
                  className="glass-card"
                  sx={{
                    p: { xs: 2.8, sm: 3.5 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(229, 169, 16, 0.3)',
                    background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 248, 238, 0.9) 100%)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 36px rgba(198, 81, 2, 0.16)',
                      borderColor: 'rgba(255, 119, 0, 0.5)',
                    },
                  }}
                >
                  {/* Decorative Gold Accent Top Bar */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(90deg, #FF7700 0%, #E5A910 50%, #FFD700 100%)',
                    }}
                  />

                  {/* Decorative Watermark Quote Icon */}
                  <FormatQuoteIcon
                    sx={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      fontSize: 52,
                      color: 'rgba(229, 169, 16, 0.15)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Devotee Header with Avatar & Details */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1 }}>
                    <Avatar
                      sx={{
                        background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
                        color: 'white',
                        fontWeight: 800,
                        mr: 1.8,
                        width: 48,
                        height: 48,
                        fontSize: '1.15rem',
                        boxShadow: '0 4px 14px rgba(255, 119, 0, 0.35)',
                        border: '2px solid #FFFFFF',
                      }}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 700,
                            color: '#1E110A',
                            fontSize: '1.02rem',
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <VerifiedIcon sx={{ fontSize: 16, color: '#25D366' }} titleAccess="Verified Devotee" />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#8C6D53',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.3,
                          fontWeight: 500,
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: 13, color: '#FF7700' }} />
                        {testimonial.location}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Star Rating Row with Score */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, zIndex: 1 }}>
                    <Rating value={testimonial.rating} readOnly size="small" sx={{ color: '#E5A910' }} />
                    <Chip
                      label="5.0 / 5.0"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(229, 169, 16, 0.12)',
                        color: '#C65102',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        height: 22,
                        borderRadius: 50,
                      }}
                    />
                  </Box>

                  {/* Review Text */}
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      fontStyle: 'italic',
                      color: '#3B271A',
                      lineHeight: 1.75,
                      fontSize: '0.94rem',
                      flexGrow: 1,
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Card Footer: Pooja Tag & Ceremony Date */}
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px dashed rgba(229, 169, 16, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 1,
                      zIndex: 1,
                    }}
                  >
                    <Chip
                      label={`🪔 ${testimonial.pooja}`}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 119, 0, 0.08)',
                        color: '#C65102',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        borderRadius: 2,
                        border: '1px solid rgba(229, 169, 16, 0.25)',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#8C6D53', fontWeight: 600 }}>
                      {testimonial.date}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final Interactive Bottom Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 7 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 248, 235, 0.95) 0%, rgba(255, 238, 204, 0.85) 100%)',
            backdropFilter: 'blur(12px)',
            borderRadius: { xs: 3, sm: 5 },
            mb: 6,
            border: '2px solid rgba(229, 169, 16, 0.4)',
            boxShadow: '0 12px 36px rgba(198, 81, 2, 0.12)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#C65102',
              fontWeight: 800,
              fontSize: { xs: '1.35rem', sm: '1.8rem', md: '2.1rem' },
            }}
          >
            🕉️ Ready to Experience Divine Blessings?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#664E3D', maxWidth: 700, mx: 'auto', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
            Book now on WhatsApp or call directly to get instant guidance on muhurat, samagri, and pooja vidhi.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component="a"
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              sx={{
                backgroundColor: '#25D366',
                color: 'white',
                fontWeight: 700,
                px: { xs: 3, sm: 4 },
                py: 1.6,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 320, sm: 'none' },
                borderRadius: 50,
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
                '&:hover': {
                  backgroundColor: '#1ebe5d',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.6)',
                },
              }}
            >
              Chat on WhatsApp
            </Button>
            <Button
              variant="outlined"
              component="a"
              href={`tel:${siteConfig.contact.phoneIntl}`}
              startIcon={<PhoneIcon />}
              sx={{
                borderColor: '#FF7700',
                color: '#FF7700',
                fontWeight: 700,
                px: { xs: 3, sm: 4 },
                py: 1.6,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 320, sm: 'none' },
                borderRadius: 50,
                borderWidth: 2,
                backgroundColor: 'white',
                '&:hover': {
                  borderColor: '#C65102',
                  backgroundColor: 'rgba(255, 119, 0, 0.08)',
                  transform: 'translateY(-2px)',
                  borderWidth: 2,
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
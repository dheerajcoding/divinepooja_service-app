import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Rating,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useData } from '../context/DataContext';
import { buildInquiryMessage, openWhatsApp } from '../utils/inquiry';
import { siteConfig } from '../config';

const PoojaDetail = () => {
  const { id } = useParams();
  const { poojas } = useData();
  const pooja = poojas.find((p) => p.id === parseInt(id, 10));

  if (!pooja) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: '"Cinzel", serif', color: '#1E110A', mb: 2 }}>
          Pooja Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#664E3D', mb: 4 }}>
          The requested pooja ritual could not be found or has been moved.
        </Typography>
        <Button component={Link} to="/poojas" variant="contained" sx={{ borderRadius: 50, px: 4 }}>
          Browse All Poojas
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: { xs: 3, sm: 5, md: 7 } }}>
      <Container maxWidth="md">
        <Card
          className="glass-card"
          sx={{
            borderRadius: { xs: 3, sm: 5 },
            overflow: 'hidden',
            border: '1.5px solid rgba(229, 169, 16, 0.35)',
            boxShadow: '0 16px 40px rgba(198, 81, 2, 0.12)',
          }}
        >
          {/* Responsive Header Image with Ambient Backdrop so No Image Cuts */}
          <Box
            className="card-zoom-media"
            sx={{
              height: { xs: 240, sm: 340, md: 420 },
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#1E110A',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: -14,
                backgroundImage: `url(${pooja.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'blur(18px) brightness(0.6)',
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
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.45))',
              }}
            />
          </Box>

          <CardContent sx={{ p: { xs: 2.5, sm: 4, md: 5 } }}>
            {/* Top metadata tags */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
              <Chip
                label={pooja.category || 'Vedic Ritual'}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 119, 0, 0.12)',
                  color: '#C65102',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  borderRadius: 50,
                  px: 1,
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', color: '#664E3D', fontSize: '0.9rem', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 18, color: '#FF7700' }} />
                <span>Duration: <strong>{pooja.duration} hrs</strong></span>
              </Box>
            </Box>

            {/* Title & Pricing */}
            <Typography
              gutterBottom
              variant="h3"
              component="h1"
              sx={{
                fontFamily: '"Cinzel", serif',
                color: '#1E110A',
                fontWeight: 800,
                fontSize: { xs: '1.55rem', sm: '2.1rem', md: '2.5rem' },
                lineHeight: 1.25,
                mb: 1.5,
              }}
            >
              🕉️ {pooja.name}
            </Typography>

            {/* Reviews & Rating */}
            {pooja.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <Rating value={pooja.rating} precision={0.1} readOnly size="small" sx={{ mr: 1, color: '#E5A910' }} />
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#C65102', mr: 0.8 }}>
                  {pooja.rating} / 5.0
                </Typography>
                <Typography variant="body2" sx={{ color: '#8C6D53' }}>
                  ({pooja.reviews || 48} verified devotees)
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Cinzel", serif',
                  color: '#C65102',
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', sm: '2.2rem' },
                  mr: 2,
                }}
              >
                ₹{pooja.price}
              </Typography>
              {pooja.originalPrice && pooja.originalPrice > pooja.price && (
                <Typography variant="h6" sx={{ textDecoration: 'line-through', color: '#8C6D53' }}>
                  ₹{pooja.originalPrice}
                </Typography>
              )}
              <Chip
                label="Complete Samagri Included"
                size="small"
                sx={{
                  ml: 2,
                  backgroundColor: 'rgba(37, 211, 102, 0.12)',
                  color: '#1B8745',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                }}
              />
            </Box>

            {/* Description */}
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.98rem', sm: '1.08rem' }, lineHeight: 1.7, color: '#4A3728', mb: 4 }}>
              {pooja.description}
            </Typography>

            {/* Pooja Benefits */}
            {pooja.benefits && pooja.benefits.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    color: '#1E110A',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    mb: 1.5,
                  }}
                >
                  ✨ Sacred Benefits & Spiritual Significance
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                  {pooja.benefits.map((benefit, index) => (
                    <Chip
                      key={index}
                      label={benefit}
                      sx={{
                        backgroundColor: 'rgba(255, 248, 235, 0.95)',
                        border: '1px solid rgba(229, 169, 16, 0.35)',
                        color: '#331C10',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        py: 2,
                        borderRadius: 50,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Samagri List */}
            {pooja.samagri && pooja.samagri.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    color: '#1E110A',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    mb: 1.5,
                  }}
                >
                  🪔 Samagri (Provided By Pandit Ji)
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    backgroundColor: 'rgba(255, 248, 235, 0.75)',
                    borderRadius: 3,
                    border: '1px solid rgba(229, 169, 16, 0.25)',
                  }}
                >
                  <List dense sx={{ py: 0 }}>
                    {pooja.samagri.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <CheckCircleOutlineIcon sx={{ color: '#25D366', fontSize: 18, mr: 1.2 }} />
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ style: { fontSize: '0.95rem', color: '#4A3728' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ mt: 5 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to={`/booking/${pooja.id}`}
                  sx={{
                    background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    px: { xs: 4, sm: 5 },
                    py: 1.6,
                    fontSize: '1.05rem',
                    borderRadius: 50,
                    width: { xs: '100%', sm: 'auto' },
                    boxShadow: '0 6px 20px rgba(255, 119, 0, 0.45)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #E66A00 0%, #C6920D 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(255, 119, 0, 0.6)',
                    },
                  }}
                >
                  🕉️ Request Online Booking
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  onClick={() =>
                    openWhatsApp(
                      buildInquiryMessage({
                        subject: `Inquiry about ${pooja.name}`,
                        poojaName: pooja.name,
                        price: pooja.price,
                        message: `Please share muhurat and details for ${pooja.name}.`,
                      })
                    )
                  }
                  sx={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    fontWeight: 700,
                    px: { xs: 4, sm: 4.5 },
                    py: 1.6,
                    fontSize: '1.05rem',
                    borderRadius: 50,
                    width: { xs: '100%', sm: 'auto' },
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                    '&:hover': {
                      backgroundColor: '#1ebe5d',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Chat on WhatsApp
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href={`tel:${siteConfig.contact.phoneIntl}`}
                  startIcon={<PhoneIcon />}
                  sx={{
                    borderColor: '#FF7700',
                    color: '#FF7700',
                    fontWeight: 700,
                    px: { xs: 3, sm: 3.5 },
                    py: 1.6,
                    borderRadius: 50,
                    borderWidth: 2,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      borderColor: '#C65102',
                      backgroundColor: 'rgba(255, 119, 0, 0.08)',
                      borderWidth: 2,
                    },
                  }}
                >
                  Call {siteConfig.contact.phone}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PoojaDetail;
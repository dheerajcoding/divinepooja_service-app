import React from 'react';
import { Container, Typography, Paper, Box, Button, Stack, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import { useLocation, Link } from 'react-router-dom';
import { siteConfig } from '../config';

const BookingConfirmation = () => {
  const location = useLocation();
  const { pooja, formData } = location.state || {};

  if (!pooja) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: '"Cinzel", serif', color: '#1E110A', mb: 2 }}>
          No Booking In Progress
        </Typography>
        <Typography variant="body1" sx={{ color: '#664E3D', mb: 4 }}>
          Please select a pooja to initiate a booking request.
        </Typography>
        <Button component={Link} to="/poojas" variant="contained" sx={{ borderRadius: 50, px: 4 }}>
          Browse Poojas
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: { xs: 4, sm: 7 } }}>
      <Container maxWidth="md">
        <Paper
          className="glass-card"
          sx={{
            p: { xs: 2.5, sm: 4, md: 5 },
            textAlign: 'center',
            borderRadius: { xs: 3, sm: 5 },
            border: '1.5px solid rgba(229, 169, 16, 0.35)',
            boxShadow: '0 16px 40px rgba(198, 81, 2, 0.1)',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: { xs: 65, sm: 80 }, color: '#25D366', mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.5rem' },
            }}
          >
            Request Received 🙏
          </Typography>
          <Typography variant="h6" sx={{ color: '#664E3D', fontWeight: 500, maxWidth: 600, mx: 'auto', mb: 3 }}>
            Our team will contact you shortly to confirm your auspicious muhurat and pandit ji details.
          </Typography>

          <Divider sx={{ my: 3.5, borderColor: 'rgba(229, 169, 16, 0.3)' }} />

          <Box
            sx={{
              textAlign: 'left',
              maxWidth: 500,
              mx: 'auto',
              p: { xs: 2.5, sm: 3 },
              backgroundColor: 'rgba(255, 248, 235, 0.7)',
              borderRadius: 3,
              border: '1px solid rgba(229, 169, 16, 0.25)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Cinzel", serif', color: '#C65102', fontWeight: 700, mb: 2 }}>
              📋 Booking Summary
            </Typography>
            <Typography sx={{ mb: 1, color: '#331C10' }}><strong>Pooja:</strong> {pooja.name}</Typography>
            <Typography sx={{ mb: 1, color: '#331C10' }}><strong>Indicative Dakshina:</strong> ₹{pooja.price}</Typography>
            {formData?.name && <Typography sx={{ mb: 1, color: '#331C10' }}><strong>Devotee:</strong> {formData.name}</Typography>}
            {formData?.phone && <Typography sx={{ mb: 1, color: '#331C10' }}><strong>Phone:</strong> {formData.phone}</Typography>}
            {formData?.date && <Typography sx={{ mb: 1, color: '#331C10' }}><strong>Date:</strong> {formData.date}</Typography>}
            {formData?.time && <Typography sx={{ mb: 1, color: '#331C10' }}><strong>Muhurat Time:</strong> {formData.time}</Typography>}
            {(formData?.street || formData?.city) && (
              <Typography sx={{ color: '#331C10' }}>
                <strong>Address:</strong>{' '}
                {[formData.street, formData.city, formData.state, formData.pincode].filter(Boolean).join(', ')}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" sx={{ color: '#664E3D', mb: 2.5 }}>
              WhatsApp should have opened with your inquiry details. If not, feel free to contact us directly:
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#25D366',
                color: 'white',
                fontWeight: 700,
                px: 3.5,
                py: 1.4,
                borderRadius: 50,
                width: { xs: '100%', sm: 'auto' },
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                '&:hover': { backgroundColor: '#1ebe5d' },
              }}
            >
              Open WhatsApp
            </Button>
            <Button
              variant="outlined"
              startIcon={<PhoneIcon />}
              href={`tel:${siteConfig.contact.phoneIntl}`}
              sx={{
                borderColor: '#FF7700',
                color: '#FF7700',
                fontWeight: 700,
                px: 3.5,
                py: 1.4,
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
            <Button
              variant="text"
              component={Link}
              to="/"
              sx={{
                color: '#664E3D',
                fontWeight: 600,
                px: 3,
                py: 1.4,
                borderRadius: 50,
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Back to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingConfirmation;

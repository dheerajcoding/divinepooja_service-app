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
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>No booking found</Typography>
        <Button component={Link} to="/poojas" variant="contained">Browse Poojas</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF8DC', py: 6 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', borderRadius: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#38a169', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2C1810', fontWeight: 'bold' }}>
            Request Received 🙏
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Our team will contact you shortly to confirm your booking.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ textAlign: 'left', maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FF9933', fontWeight: 'bold' }}>
              Booking Summary
            </Typography>
            <Typography><strong>Pooja:</strong> {pooja.name}</Typography>
            <Typography><strong>Indicative Price:</strong> ₹{pooja.price}</Typography>
            {formData?.name && <Typography><strong>Name:</strong> {formData.name}</Typography>}
            {formData?.phone && <Typography><strong>Phone:</strong> {formData.phone}</Typography>}
            {formData?.date && <Typography><strong>Date:</strong> {formData.date}</Typography>}
            {formData?.time && <Typography><strong>Time:</strong> {formData.time}</Typography>}
            {(formData?.street || formData?.city) && (
              <Typography>
                <strong>Address:</strong>{' '}
                {[formData.street, formData.city, formData.state, formData.pincode].filter(Boolean).join(', ')}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              You should also see WhatsApp open with your inquiry. If not, contact us directly:
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ backgroundColor: '#25D366', '&:hover': { backgroundColor: '#1ebe5d' } }}
            >
              WhatsApp
            </Button>
            <Button
              variant="outlined"
              startIcon={<PhoneIcon />}
              href={`tel:${siteConfig.contact.phoneIntl}`}
            >
              Call {siteConfig.contact.phone}
            </Button>
            <Button variant="text" component={Link} to="/">
              Back to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingConfirmation;

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Stack,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { useData } from '../context/DataContext';
import { buildInquiryMessage, openMail, openWhatsApp, submitInquiry } from '../utils/inquiry';
import { siteConfig } from '../config';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  notes: '',
};

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { poojas } = useData();
  const pooja = poojas.find((p) => p.id === parseInt(id, 10));

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });

  if (!pooja) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Pooja not found</Typography>
        <Button component={Link} to="/poojas" variant="contained">Browse Poojas</Button>
      </Container>
    );
  }

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Required';
    if (!/^[0-9+\-\s()]{7,}$/.test(formData.phone || '')) next.phone = 'Valid phone required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = 'Invalid email';
    if (!formData.date) next.date = 'Required';
    if (!formData.city.trim()) next.city = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildPayload = () => ({
    subject: `Booking request: ${pooja.name}`,
    poojaName: pooja.name,
    price: pooja.price,
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    date: formData.date,
    time: formData.time,
    address: [formData.street, formData.city, formData.state, formData.pincode]
      .filter(Boolean)
      .join(', '),
    message: formData.notes,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = buildPayload();
    const result = await submitInquiry(payload);
    const message = buildInquiryMessage(payload);
    openWhatsApp(message);
    setSubmitting(false);
    setSnack({
      open: true,
      severity: 'success',
      message: result.ok
        ? 'Request received! WhatsApp is opening to confirm your booking.'
        : 'WhatsApp is opening so we can confirm your booking instantly.',
    });
    navigate('/confirmation', { state: { pooja, formData } });
  };

  const handleEmail = () => {
    if (!validate()) return;
    const payload = buildPayload();
    openMail(payload.subject, buildInquiryMessage(payload));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF8DC', py: 4 }}>
      <Container maxWidth="md">
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center', color: '#FF9933', fontWeight: 'bold', mb: 1 }}
          >
            🕉️ Request Booking
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#2C1810', mb: 1 }}>
            {pooja.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', color: '#B8860B', fontWeight: 'bold', mb: 3 }}>
            ₹{pooja.price} · approx. {pooja.duration} hrs
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            Submit your details and we will confirm pandit availability, samagri and the
            final amount on WhatsApp / call. <strong>No payment is taken on this site.</strong>
          </Alert>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 2 }}>
              Your Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Full Name" name="name"
                  value={formData.name} onChange={handleChange}
                  error={!!errors.name} helperText={errors.name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Phone" name="phone"
                  value={formData.phone} onChange={handleChange}
                  error={!!errors.phone} helperText={errors.phone}
                  inputProps={{ inputMode: 'tel' }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email (optional)" type="email" name="email"
                  value={formData.email} onChange={handleChange}
                  error={!!errors.email} helperText={errors.email} />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 2 }}>
              📅 Preferred Date & Time
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required type="date" label="Date" name="date"
                  value={formData.date} onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date} helperText={errors.date} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="time" label="Time" name="time"
                  value={formData.time} onChange={handleChange}
                  InputLabelProps={{ shrink: true }} />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 2 }}>
              📍 Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Street Address" name="street"
                  value={formData.street} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth required label="City" name="city"
                  value={formData.city} onChange={handleChange}
                  error={!!errors.city} helperText={errors.city} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="State" name="state"
                  value={formData.state} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Pincode" name="pincode"
                  value={formData.pincode} onChange={handleChange}
                  inputProps={{ inputMode: 'numeric' }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3}
                  label="Any special requests (optional)" name="notes"
                  value={formData.notes} onChange={handleChange}
                  placeholder="e.g. specific gotra, family tradition, language preference" />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={submitting}
                startIcon={<WhatsAppIcon />}
                sx={{
                  backgroundColor: '#25D366',
                  fontWeight: 'bold',
                  py: 1.5,
                  '&:hover': { backgroundColor: '#1ebe5d' },
                }}
              >
                {submitting ? 'Sending…' : 'Send Booking Request'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleEmail}
                startIcon={<EmailIcon />}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                Email Us Instead
              </Button>
            </Stack>

            <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'center', color: 'text.secondary' }}>
              Or call us directly at{' '}
              <a href={`tel:${siteConfig.contact.phoneIntl}`} style={{ color: '#FF9933', fontWeight: 600 }}>
                {siteConfig.contact.phone}
              </a>
            </Typography>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled">{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Booking;

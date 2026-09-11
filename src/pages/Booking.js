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
import PhoneIcon from '@mui/icons-material/Phone';
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
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: '"Cinzel", serif', color: '#1E110A', mb: 2 }}>
          Pooja Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#664E3D', mb: 4 }}>
          Please select a valid pooja ritual from our catalog.
        </Typography>
        <Button component={Link} to="/poojas" variant="contained" sx={{ borderRadius: 50, px: 4 }}>
          Browse Poojas
        </Button>
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: { xs: 4, sm: 6 } }}>
      <Container maxWidth="md">
        <Paper
          className="glass-card"
          sx={{
            p: { xs: 2.5, sm: 4, md: 5 },
            borderRadius: { xs: 3, sm: 5 },
            border: '1.5px solid rgba(229, 169, 16, 0.35)',
            boxShadow: '0 16px 40px rgba(198, 81, 2, 0.1)',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.5rem' },
              mb: 1,
            }}
          >
            🕉️ Request Booking
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', color: '#C65102', fontWeight: 700, mb: 1, fontFamily: '"Cinzel", serif' }}>
            {pooja.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', color: '#664E3D', fontWeight: 600, mb: 3 }}>
            Indicative Dakshina: <strong style={{ color: '#C65102', fontSize: '1.2rem' }}>₹{pooja.price}</strong> · Approx. {pooja.duration} hrs (Complete Samagri Included)
          </Typography>

          <Alert
            severity="info"
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 248, 235, 0.95)',
              border: '1px solid rgba(229, 169, 16, 0.3)',
              color: '#4A3728',
            }}
          >
            Submit your details and we will confirm pandit availability, auspicious muhurat, and complete samagri arrangements on WhatsApp / call. <strong>No advance online payment is required on this website.</strong>
          </Alert>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Cinzel", serif',
                color: '#1E110A',
                fontWeight: 700,
                mb: 2,
              }}
            >
              👤 Devotee Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3.5 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Contact Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  inputProps={{ inputMode: 'tel' }}
                  placeholder="e.g. 8750942001"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address (optional)"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
            </Grid>

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Cinzel", serif',
                color: '#1E110A',
                fontWeight: 700,
                mb: 2,
              }}
            >
              📅 Auspicious Date & Preferred Time
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3.5 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Pooja Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  helperText={errors.date}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Preferred Muhurat Time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Cinzel", serif',
                color: '#1E110A',
                fontWeight: 700,
                mb: 2,
              }}
            >
              📍 Location for Home Pooja
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address / House No. / Society"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Special Requests or Gotra Details (optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. specific gotra, family traditions, language preference for pandit ji"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: 'rgba(229, 169, 16, 0.3)' }} />

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
                  color: 'white',
                  fontWeight: 700,
                  py: 1.6,
                  fontSize: '1.05rem',
                  borderRadius: 50,
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                  '&:hover': {
                    backgroundColor: '#1ebe5d',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {submitting ? 'Connecting…' : 'Book on WhatsApp Instantly'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleEmail}
                startIcon={<EmailIcon />}
                sx={{
                  py: 1.6,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  borderRadius: 50,
                  borderColor: '#FF7700',
                  color: '#FF7700',
                  '&:hover': {
                    borderColor: '#C65102',
                    backgroundColor: 'rgba(255, 119, 0, 0.08)',
                  },
                }}
              >
                Email Details
              </Button>
            </Stack>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#664E3D', display: 'inline-flex', alignItems: 'center', gap: 0.8 }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#FF7700' }} />
                Prefer calling directly?{' '}
                <a
                  href={`tel:${siteConfig.contact.phoneIntl}`}
                  style={{ color: '#C65102', fontWeight: 700, textDecoration: 'none' }}
                >
                  {siteConfig.contact.phone}
                </a>
              </Typography>
            </Box>
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

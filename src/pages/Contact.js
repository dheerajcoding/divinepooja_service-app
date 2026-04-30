import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteConfig } from '../config';
import { buildInquiryMessage, openMail, openWhatsApp, submitInquiry } from '../utils/inquiry';

const initialForm = { name: '', email: '', phone: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Please enter your name';
    if (!formData.phone.trim() || !/^[0-9+\-\s()]{7,}$/.test(formData.phone))
      next.phone = 'Please enter a valid phone number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = 'Please enter a valid email';
    if (!formData.message.trim() || formData.message.trim().length < 10)
      next.message = 'Please share a few details (at least 10 characters)';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = { ...formData, subject: 'Website inquiry' };
    const result = await submitInquiry(payload);

    const message = buildInquiryMessage(payload);
    openWhatsApp(message);

    setSubmitting(false);
    setFormData(initialForm);
    setSnack({
      open: true,
      severity: 'success',
      message: result.ok
        ? 'Thank you! Your message was sent and WhatsApp is opening for instant confirmation.'
        : 'Thank you! WhatsApp is opening so we can confirm your request instantly.',
    });
  };

  const handleEmailUs = () => {
    if (!validate()) return;
    const message = buildInquiryMessage({ ...formData, subject: 'Website inquiry' });
    openMail(`Inquiry from ${formData.name || 'website visitor'}`, message);
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ color: '#FF9933', fontSize: 30 }} />,
      title: 'Phone',
      details: [siteConfig.contact.phone],
      subtitle: siteConfig.contact.hours,
      href: `tel:${siteConfig.contact.phoneIntl}`,
    },
    {
      icon: <WhatsAppIcon sx={{ color: '#25D366', fontSize: 30 }} />,
      title: 'WhatsApp',
      details: [siteConfig.contact.phone],
      subtitle: 'Quick replies — usually within 30 minutes',
      href: `https://wa.me/${siteConfig.contact.whatsapp}`,
    },
    {
      icon: <EmailIcon sx={{ color: '#FF9933', fontSize: 30 }} />,
      title: 'Email',
      details: [siteConfig.contact.email],
      subtitle: 'We respond within 24 hours',
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: <LocationOnIcon sx={{ color: '#FF9933', fontSize: 30 }} />,
      title: 'Address',
      details: [siteConfig.contact.addressLine1, siteConfig.contact.addressLine2],
      subtitle: 'Visit our office',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF8DC', py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            color: '#FF9933',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          📞 Get In Touch
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: '#5D4E37' }}>
          Tell us what pooja you need — we’ll arrange an experienced pandit and all
          samagri for you.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ color: '#FF9933', fontWeight: 'bold', mb: 3 }}>
              📍 Reach Us Directly
            </Typography>

            <Grid container spacing={3}>
              {contactInfo.map((info) => (
                <Grid item xs={12} sm={6} key={info.title}>
                  <Card
                    component={info.href ? 'a' : 'div'}
                    href={info.href}
                    target={info.href && info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href && info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      height: '100%',
                      display: 'block',
                      textDecoration: 'none',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
                      border: '2px solid #FFE4B5',
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)' },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {info.icon}
                        <Typography variant="h6" sx={{ ml: 2, color: '#FF9933', fontWeight: 'bold' }}>
                          {info.title}
                        </Typography>
                      </Box>
                      {info.details.map((detail) => (
                        <Typography key={detail} variant="body2" sx={{ color: '#5D4E37', mb: 0.5 }}>
                          {detail}
                        </Typography>
                      ))}
                      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                        {info.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paper
              elevation={2}
              sx={{
                p: 3,
                mt: 4,
                background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)',
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#FF9933', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                Service Hours
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Monday - Sunday" secondary="6:00 AM - 9:00 PM" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Festival Season" secondary="Extended hours available" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Same-day bookings" secondary="Subject to pandit availability" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
                border: '2px solid #FFE4B5',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#FF9933', fontWeight: 'bold', textAlign: 'center' }}>
                  Send Us a Message
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', mb: 3, color: '#5D4E37' }}>
                  Fill in your details and we’ll get back to you on WhatsApp or call.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{ mb: 2 }}
                    variant="outlined"
                    inputProps={{ inputMode: 'tel' }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address (optional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Which pooja or occasion?"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    error={!!errors.message}
                    helperText={errors.message || 'e.g. Satyanarayan pooja on Sunday at home in Pune'}
                    sx={{ mb: 3 }}
                    variant="outlined"
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={submitting}
                      startIcon={<WhatsAppIcon />}
                      sx={{
                        backgroundColor: '#25D366',
                        fontWeight: 'bold',
                        py: 1.5,
                        '&:hover': { backgroundColor: '#1ebe5d' },
                      }}
                    >
                      {submitting ? 'Sending…' : 'Send via WhatsApp'}
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      onClick={handleEmailUs}
                      startIcon={<EmailIcon />}
                      sx={{ py: 1.5, fontWeight: 'bold' }}
                    >
                      Email Us
                    </Button>
                  </Stack>

                  <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary', textAlign: 'center' }}>
                    By contacting us you agree to be reached on the phone / email you provide.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper
          elevation={2}
          sx={{
            p: 4,
            mt: 6,
            background: 'linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#FF9933', fontWeight: 'bold' }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1 }}>
                Q: How far in advance should I book a pooja?
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#5D4E37' }}>
                A: We recommend booking 2–3 days in advance. For festivals or special muhurats, please reach out 1–2 weeks ahead.
              </Typography>

              <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1 }}>
                Q: Do you arrange the samagri (puja items)?
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#5D4E37' }}>
                A: Yes, full samagri can be arranged on request. You can also provide your own — just let us know.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1 }}>
                Q: Can the pooja be customized?
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#5D4E37' }}>
                A: Absolutely. Our pandits respect family traditions and tailor the rituals as per your preferences.
              </Typography>

              <Typography variant="h6" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1 }}>
                Q: Which languages do the pandits speak?
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#5D4E37' }}>
                A: Sanskrit and Hindi by default, with English / regional language support on request.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;

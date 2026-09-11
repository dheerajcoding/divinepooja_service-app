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
      icon: <LocationOnIcon sx={{ color: '#FF7700', fontSize: 30 }} />,
      title: 'Address',
      details: [siteConfig.contact.addressLine1, siteConfig.contact.addressLine2],
      subtitle: 'Click for directions on Google Maps',
      href: 'https://maps.google.com/?q=Aya+Nagar+Shiv+Mandir+New+Delhi+India',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            fontFamily: '"Cinzel", serif',
            color: '#1E110A',
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3rem' },
          }}
        >
          📞 Get In Touch With Pandit Ji
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: '#664E3D', maxWidth: 700, mx: 'auto', fontWeight: 500 }}>
          Tell us what pooja or ritual you need — we’ll arrange an experienced pandit and all authentic samagri for your family.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: '"Cinzel", serif',
                color: '#1E110A',
                fontWeight: 700,
                mb: 3,
              }}
            >
              📍 Direct Contact Channels
            </Typography>

            <Grid container spacing={2.5}>
              {contactInfo.map((info) => (
                <Grid item xs={12} sm={6} key={info.title}>
                  <Card
                    className="glass-card"
                    component={info.href ? 'a' : 'div'}
                    href={info.href}
                    target={info.href && info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href && info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      height: '100%',
                      display: 'block',
                      textDecoration: 'none',
                      borderRadius: 3.5,
                      p: 1,
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 119, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Typography variant="h6" sx={{ color: '#1E110A', fontWeight: 700 }}>
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
              elevation={0}
              className="glass-card"
              sx={{
                p: 3.5,
                mt: 4,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: '"Cinzel", serif',
                  color: '#C65102',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AccessTimeIcon sx={{ mr: 1, color: '#FF7700' }} />
                Service & Consultation Hours
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Monday - Sunday"
                    secondary="6:00 AM - 9:00 PM (Direct Call & WhatsApp)"
                    primaryTypographyProps={{ style: { fontWeight: 600, color: '#1E110A' } }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Festival Season Muhurats"
                    secondary="24/7 Priority pandit arrangements during Diwali, Navratri & Ganesh Chaturthi"
                    primaryTypographyProps={{ style: { fontWeight: 600, color: '#1E110A' } }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Same-Day Emergency Bookings"
                    secondary="Subject to pandit ji availability in your locality"
                    primaryTypographyProps={{ style: { fontWeight: 600, color: '#1E110A' } }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className="glass-card"
              sx={{
                borderRadius: 4,
                border: '1.5px solid rgba(229, 169, 16, 0.35)',
              }}
            >
              <CardContent sx={{ p: { xs: 2.2, sm: 3.5, md: 4.5 } }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    color: '#1E110A',
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  Send Pooja Inquiry
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', mb: 3.5, color: '#664E3D' }}>
                  Fill in your details — we will confirm muhurat and pandit availability instantly on WhatsApp.
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

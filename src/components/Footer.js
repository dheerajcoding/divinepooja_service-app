import React from 'react';
import { Box, Container, Grid, Typography, Divider, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { siteConfig } from '../config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Poojas', path: '/poojas' },
    { name: 'Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Home Pooja Services',
    'Temple Pooja Booking',
    'Special Occasion Pooja',
    'Corporate Pooja Events',
    'Festival Pooja Packages',
  ];

  const socialLinks = [
    siteConfig.social.facebook && { icon: <FacebookIcon />, url: siteConfig.social.facebook, color: '#1877F2', label: 'Facebook' },
    siteConfig.social.instagram && { icon: <InstagramIcon />, url: siteConfig.social.instagram, color: '#E4405F', label: 'Instagram' },
    { icon: <WhatsAppIcon />, url: `https://wa.me/${siteConfig.contact.whatsapp}`, color: '#25D366', label: 'WhatsApp' },
  ].filter(Boolean);

  return (
    <Box
      sx={{
        backgroundColor: '#160B05',
        color: '#FFF8DC',
        pt: 8,
        pb: 5,
        mt: 'auto',
        borderTop: '3px solid #E5A910',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.3)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: '#FFD700',
                fontWeight: 800,
                fontFamily: '"Cinzel", serif',
                fontSize: '1.25rem',
                letterSpacing: '0.02em',
              }}
            >
              🕉️ {siteConfig.brand.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7, color: '#E2D9CC' }}>
              {siteConfig.brand.tagline}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  aria-label={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: social.color,
                    backgroundColor: 'rgba(255, 215, 0, 0.08)',
                    border: '1px solid rgba(229, 169, 16, 0.3)',
                    p: 1.2,
                    transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      backgroundColor: '#FF7700',
                      color: '#FFFFFF',
                      transform: 'translateY(-3px) scale(1.08)',
                      boxShadow: '0 6px 16px rgba(255, 119, 0, 0.4)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: '#FFD700',
                fontWeight: 700,
                fontFamily: '"Cinzel", serif',
                fontSize: '1.1rem',
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            {quickLinks.map((link) => (
              <Box key={link.name} sx={{ mb: 1.2 }}>
                <RouterLink
                  to={link.path}
                  style={{
                    color: '#C7BDB1',
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    transition: 'all 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFD700';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#C7BDB1';
                    e.currentTarget.style.transform = 'translateX(0px)';
                  }}
                >
                  {link.name}
                </RouterLink>
              </Box>
            ))}
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: '#FFD700',
                fontWeight: 700,
                fontFamily: '"Cinzel", serif',
                fontSize: '1.1rem',
                mb: 2,
              }}
            >
              Sacred Services
            </Typography>
            {services.map((service) => (
              <Typography
                key={service}
                variant="body2"
                sx={{
                  mb: 1.2,
                  color: '#C7BDB1',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                }}
              >
                <span style={{ color: '#E5A910' }}>•</span> {service}
              </Typography>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: '#FFD700',
                fontWeight: 700,
                fontFamily: '"Cinzel", serif',
                fontSize: '1.1rem',
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <PhoneIcon sx={{ mr: 1.2, fontSize: 19, color: '#FF7700' }} />
              <Typography
                component="a"
                href={`tel:${siteConfig.contact.phoneIntl}`}
                variant="body2"
                sx={{
                  color: '#E2D9CC',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#FFD700' },
                }}
              >
                {siteConfig.contact.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <EmailIcon sx={{ mr: 1.2, fontSize: 19, color: '#FF7700' }} />
              <Typography
                component="a"
                href={`mailto:${siteConfig.contact.email}`}
                variant="body2"
                sx={{
                  color: '#E2D9CC',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#FFD700' },
                }}
              >
                {siteConfig.contact.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LocationOnIcon sx={{ mr: 1.2, mt: 0.4, fontSize: 19, color: '#FF7700' }} />
              <Typography variant="body2" sx={{ color: '#C7BDB1', lineHeight: 1.5 }}>
                {siteConfig.contact.addressLine1 ? `${siteConfig.contact.addressLine1}, ` : ''}
                {siteConfig.contact.addressLine2 || 'New Delhi, India'}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ mt: 1, display: 'block', fontStyle: 'italic', color: '#E5A910' }}>
              {siteConfig.contact.hours}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4.5, borderColor: 'rgba(229, 169, 16, 0.2)' }} />

        {/* Bottom Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 0.8, color: '#9E9283' }}>
            © {currentYear} {siteConfig.brand.name}. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: '#E5A910', opacity: 0.9 }}>
            Vedic Rituals Performed With Devotion & Authenticity
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
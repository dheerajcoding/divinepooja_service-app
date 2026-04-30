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
        backgroundColor: '#2C1810',
        color: '#FFF8DC',
        py: 6,
        mt: 'auto',
        borderTop: '4px solid #FFD700',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold' }}>
              🕉️ {siteConfig.brand.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: '#FFE4B5' }}>
              {siteConfig.brand.tagline}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
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
                    backgroundColor: 'rgba(255,215,0,0.1)',
                    border: '1px solid #FFD700',
                    '&:hover': {
                      backgroundColor: '#FFD700',
                      color: '#2C1810',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            {quickLinks.map((link) => (
              <RouterLink
                key={link.name}
                to={link.path}
                style={{
                  display: 'block',
                  color: '#a0aec0',
                  textDecoration: 'none',
                  marginBottom: '8px',
                  fontSize: '0.875rem',
                }}
                onMouseEnter={(e) => e.target.style.color = '#FFD700'}
                onMouseLeave={(e) => e.target.style.color = '#FFE4B5'}
              >
                {link.name}
              </RouterLink>
            ))}
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold' }}>
              Our Services
            </Typography>
            {services.map((service) => (
              <Typography key={service} variant="body2" sx={{ mb: 1, color: '#a0aec0' }}>
                • {service}
              </Typography>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold' }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 18, color: '#FFD700' }} />
              <Typography component="a" href={`tel:${siteConfig.contact.phoneIntl}`} variant="body2" sx={{ color: '#FFE4B5', textDecoration: 'none' }}>
                {siteConfig.contact.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 18, color: '#FFD700' }} />
              <Typography component="a" href={`mailto:${siteConfig.contact.email}`} variant="body2" sx={{ color: '#FFE4B5', textDecoration: 'none' }}>
                {siteConfig.contact.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, mt: 0.5, fontSize: 18, color: '#FFD700' }} />
              <Typography variant="body2" sx={{ color: '#FFE4B5' }}>
                {siteConfig.contact.addressLine1}<br />
                {siteConfig.contact.addressLine2}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: '#FFE4B5' }}>
              {siteConfig.contact.hours}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#2d3748' }} />

        {/* Bottom Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1, color: '#a0aec0' }}>
            © {currentYear} {siteConfig.brand.name}. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: '#718096' }}>
            Made with ❤️ for spiritual wellness
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
import React from 'react';
import { Box, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config';

/**
 * MobileBottomBar
 * High-converting sticky action bar for mobile phone screens.
 * Gives instant 1-tap access to call Pandit Ji or chat on WhatsApp.
 */
const MobileBottomBar = () => {
  const location = useLocation();

  // Hide on admin page to keep admin interface uncluttered
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const defaultMsg = encodeURIComponent('Namaste Pandit Ji! I would like to book a pooja ceremony at home.');
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${defaultMsg}`;

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1.5px solid rgba(229, 169, 16, 0.35)',
        boxShadow: '0 -6px 24px rgba(0, 0, 0, 0.12)',
        px: 2,
        py: 1.2,
        pb: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        gap: 1.5,
      }}
    >
      {/* Call Button */}
      <Button
        component="a"
        href={`tel:${siteConfig.contact.phoneIntl}`}
        variant="outlined"
        fullWidth
        startIcon={<PhoneIcon sx={{ fontSize: 20 }} />}
        sx={{
          borderColor: '#FF7700',
          color: '#C65102',
          backgroundColor: 'rgba(255, 119, 0, 0.06)',
          fontWeight: 700,
          fontSize: '0.92rem',
          py: 1.2,
          borderRadius: 50,
          borderWidth: 1.8,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(255, 119, 0, 0.12)',
            borderColor: '#FF7700',
            borderWidth: 1.8,
          },
        }}
      >
        Call Pandit Ji
      </Button>

      {/* WhatsApp Button */}
      <Button
        component="a"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        fullWidth
        startIcon={<WhatsAppIcon sx={{ fontSize: 20 }} />}
        sx={{
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '0.92rem',
          py: 1.2,
          borderRadius: 50,
          textTransform: 'none',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
          '&:hover': {
            backgroundColor: '#1ebe5d',
            boxShadow: '0 6px 18px rgba(37, 211, 102, 0.55)',
          },
        }}
      >
        Book on WhatsApp
      </Button>
    </Box>
  );
};

export default MobileBottomBar;

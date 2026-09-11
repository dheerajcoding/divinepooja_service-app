import React from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteConfig } from '../config';

/**
 * Floating WhatsApp call-to-action visible on every page so visitors can
 * reach the team in one tap.
 */
const WhatsAppFab = () => {
  const message = encodeURIComponent(
    `Namaste! I would like to know more about your pooja services.`
  );
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`;

  return (
    <Zoom in>
      <Tooltip title="Chat with us on WhatsApp" placement="left" arrow>
        <Fab
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="whatsapp-ripple-btn"
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'fixed',
            bottom: 28,
            right: 28,
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            zIndex: (theme) => theme.zIndex.snackbar + 1,
            width: { xs: 58, md: 64 },
            height: { xs: 58, md: 64 },
            boxShadow: '0 8px 24px rgba(37,211,102,0.45)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              backgroundColor: '#1ebe5d',
              transform: 'scale(1.1) rotate(5deg)',
              boxShadow: '0 12px 30px rgba(37,211,102,0.6)',
            },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 32, md: 36 } }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default WhatsAppFab;

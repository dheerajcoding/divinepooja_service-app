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
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            zIndex: (theme) => theme.zIndex.snackbar + 1,
            boxShadow: '0 6px 16px rgba(37,211,102,0.45)',
            '&:hover': { backgroundColor: '#1ebe5d' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default WhatsAppFab;

import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Button, Box, Typography } from '@mui/material';
import { Close as CloseIcon, GetApp as InstallIcon } from '@mui/icons-material';
import { siteConfig } from '../config';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install prompt after a delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000); // Show after 3 seconds
    };

    const handleAppInstalled = () => {
      // Hide the install prompt
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Reset the deferred prompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  };

  const handleClose = () => {
    setShowInstallPrompt(false);
  };

  return (
    <Snackbar
      open={showInstallPrompt}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: 2 }}
    >
      <Alert
        severity="info"
        variant="filled"
        sx={{
          backgroundColor: '#FF9933',
          color: 'white',
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(255,153,51,0.3)',
          minWidth: { xs: '90vw', sm: 400 },
        }}
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              size="small"
              onClick={handleInstallClick}
              startIcon={<InstallIcon />}
              sx={{
                backgroundColor: '#FFD700',
                color: '#2C1810',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              Install App
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={handleClose}
              startIcon={<CloseIcon />}
            >
              Later
            </Button>
          </Box>
        }
      >
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            🕉️ Install {siteConfig.brand.name} App
          </Typography>
          <Typography variant="body2">
            Get instant access to pooja bookings and spiritual services!
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default InstallPrompt;
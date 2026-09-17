import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  GetApp as InstallIcon,
  IosShare as IosShareIcon,
  AddToHomeScreen as AddToHomeScreenIcon,
  CheckCircleOutline as CheckCircleIcon,
} from '@mui/icons-material';
import { siteConfig } from '../config';

const isIOS = () => {
  if (typeof window === 'undefined' || !window.navigator) return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua) && !window.MSStream;
};

const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    ('standalone' in window.navigator && window.navigator.standalone) ||
    window.matchMedia('(display-mode: standalone)').matches
  );
};

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showIOSDialog, setShowIOSDialog] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // If app is already installed / running in standalone mode, do nothing
    if (isStandalone()) {
      return;
    }

    const ios = isIOS();
    setIsIOSDevice(ios);

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('pwa_install_dismissed') === 'true';
    if (isDismissed) return;

    // 1. Android / Desktop Chrome: beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2500);
    };

    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 2. iOS Safari: Does not trigger beforeinstallprompt, so show after delay
    if (ios) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOSDevice) {
      // Open step-by-step visual guide for iOS users
      setShowIOSDialog(true);
      setShowInstallPrompt(false);
      return;
    }

    if (!deferredPrompt) return;

    // Show native Chromium install prompt
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallPrompt(false);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
  };

  const handleClose = () => {
    setShowInstallPrompt(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  const handleCloseIOSDialog = () => {
    setShowIOSDialog(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  return (
    <>
      {/* Floating Bottom Bar Prompt */}
      <Snackbar
        open={showInstallPrompt}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 2, zIndex: 1400 }}
      >
        <Alert
          severity="info"
          variant="filled"
          sx={{
            backgroundColor: '#FF7700',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(255, 119, 0, 0.45)',
            border: '1.5px solid rgba(255, 215, 0, 0.5)',
            minWidth: { xs: '92vw', sm: 420 },
            alignItems: 'center',
          }}
          action={
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                color="inherit"
                size="small"
                onClick={handleInstallClick}
                startIcon={isIOSDevice ? <IosShareIcon /> : <InstallIcon />}
                sx={{
                  backgroundColor: '#FFD700',
                  color: '#1E110A',
                  fontWeight: 800,
                  px: 1.8,
                  py: 0.7,
                  borderRadius: 50,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#FF7700',
                  },
                }}
              >
                {isIOSDevice ? 'How to Add' : 'Install App'}
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                sx={{ ml: 0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/icon-192.png"
              alt={siteConfig.brand.name}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.4)',
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                Install {siteConfig.brand.name} App
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', opacity: 0.95, mt: 0.25, fontSize: '0.75rem' }}>
                {isIOSDevice ? 'Add to iPhone / iPad Home Screen for quick access' : 'Fast booking & instant pooja reminders!'}
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Snackbar>

      {/* iOS Step-by-Step Installation Modal */}
      <Dialog
        open={showIOSDialog}
        onClose={handleCloseIOSDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
            backgroundColor: '#FFFDF9',
            border: '2px solid #E5A910',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/icon-192.png"
              alt={siteConfig.brand.name}
              sx={{ width: 36, height: 36, borderRadius: 2 }}
            />
            <Typography variant="h6" sx={{ fontFamily: '"Cinzel", serif', fontWeight: 700, color: '#1E110A', fontSize: '1.15rem' }}>
              Install on iPhone / iPad
            </Typography>
          </Box>
          <IconButton onClick={handleCloseIOSDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: '#664E3D', mb: 2 }}>
            Follow these 3 quick steps in Safari to add <strong>{siteConfig.brand.name}</strong> to your home screen:
          </Typography>

          <List sx={{ pt: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 119, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF7700',
                    fontWeight: 'bold',
                    fontSize: '0.88rem',
                  }}
                >
                  1
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: '#1E110A', fontWeight: 600 }}>
                    Tap the <strong>Share</strong> icon{' '}
                    <IosShareIcon sx={{ fontSize: 18, verticalAlign: 'middle', color: '#007AFF', mx: 0.3 }} /> at the bottom or top of Safari.
                  </Typography>
                }
              />
            </ListItem>

            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 119, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF7700',
                    fontWeight: 'bold',
                    fontSize: '0.88rem',
                  }}
                >
                  2
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: '#1E110A', fontWeight: 600 }}>
                    Scroll down and tap <strong>'Add to Home Screen'</strong>{' '}
                    <AddToHomeScreenIcon sx={{ fontSize: 18, verticalAlign: 'middle', color: '#1E110A', mx: 0.3 }} />.
                  </Typography>
                }
              />
            </ListItem>

            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 119, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF7700',
                    fontWeight: 'bold',
                    fontSize: '0.88rem',
                  }}
                >
                  3
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: '#1E110A', fontWeight: 600 }}>
                    Tap <strong>'Add'</strong> in the top right corner.
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseIOSDialog}
            startIcon={<CheckCircleIcon />}
            sx={{
              background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
              color: 'white',
              fontWeight: 700,
              borderRadius: 50,
              py: 1,
            }}
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InstallPrompt;
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { siteConfig } from '../config';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: <HomeIcon sx={{ color: '#FF7700' }} /> },
    { name: 'Poojas', path: '/poojas', icon: <AutoAwesomeIcon sx={{ color: '#FF7700' }} /> },
    { name: 'Packages', path: '/packages', icon: <CardGiftcardIcon sx={{ color: '#FF7700' }} /> },
    { name: 'About', path: '/about', icon: <InfoIcon sx={{ color: '#FF7700' }} /> },
    { name: 'Contact', path: '/contact', icon: <ContactPhoneIcon sx={{ color: '#FF7700' }} /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(255, 119, 0, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '2px solid rgba(229, 169, 16, 0.4)',
        boxShadow: '0 4px 24px rgba(198, 81, 2, 0.18)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 }, minHeight: { xs: 62, sm: 68, md: 78 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontFamily: '"Cinzel", serif',
              fontWeight: 800,
              fontSize: { xs: '1.08rem', sm: '1.35rem', md: '1.55rem' },
              letterSpacing: { xs: '0.01em', sm: '0.03em' },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.8, sm: 1.2 },
              textShadow: '0 2px 8px rgba(0,0,0,0.25)',
              transition: 'transform 0.25s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <span style={{ filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.6))', fontSize: '1.25em' }}>🕉️</span>
            <span>{siteConfig.brand.name}</span>
          </Typography>

          {isMobile ? (
            // Mobile Action Buttons & Drawer Toggle
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                component="a"
                href={`tel:${siteConfig.contact.phoneIntl}`}
                sx={{
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.18)',
                  p: 0.9,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                }}
                aria-label="Call Pandit Ji"
              >
                <PhoneIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Open Navigation Menu"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.14)',
                  borderRadius: 2,
                  p: 0.9,
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Mobile Sliding Drawer Navigation */}
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                  sx: {
                    width: { xs: '82vw', sm: 320 },
                    maxWidth: 340,
                    backgroundColor: '#FFFDF9',
                    backgroundImage: 'linear-gradient(180deg, rgba(255, 248, 235, 0.95) 0%, #FFFFFF 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
                  },
                }}
              >
                <Box>
                  {/* Drawer Header */}
                  <Box
                    sx={{
                      p: 2.2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '2px solid rgba(229, 169, 16, 0.3)',
                      background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
                      color: 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ fontSize: '1.4rem' }}>🕉️</span>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Cinzel", serif',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                        }}
                      >
                        {siteConfig.brand.name}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={handleDrawerToggle}
                      sx={{ color: 'white', p: 0.5 }}
                      aria-label="Close Navigation"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {/* Navigation List */}
                  <List sx={{ px: 1.5, py: 2 }}>
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <ListItem key={item.name} disablePadding sx={{ mb: 0.8 }}>
                          <ListItemButton
                            component={Link}
                            to={item.path}
                            onClick={handleDrawerToggle}
                            sx={{
                              borderRadius: 2.5,
                              py: 1.4,
                              px: 2,
                              backgroundColor: isActive ? 'rgba(255, 119, 0, 0.12)' : 'transparent',
                              border: isActive ? '1px solid rgba(255, 119, 0, 0.3)' : '1px solid transparent',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 119, 0, 0.08)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 38 }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={item.name}
                              primaryTypographyProps={{
                                fontWeight: isActive ? 800 : 600,
                                color: isActive ? '#C65102' : '#331C10',
                                fontSize: '1.02rem',
                              }}
                            />
                            <ChevronRightIcon sx={{ color: isActive ? '#FF7700' : '#B8A494', fontSize: 20 }} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>

                {/* Drawer Footer Actions */}
                <Box sx={{ p: 2.2, borderTop: '1px solid rgba(229, 169, 16, 0.3)', backgroundColor: 'rgba(255, 248, 235, 0.6)' }}>
                  <Button
                    component="a"
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    fullWidth
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      backgroundColor: '#25D366',
                      color: 'white',
                      fontWeight: 700,
                      py: 1.3,
                      borderRadius: 50,
                      mb: 1.2,
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
                      '&:hover': { backgroundColor: '#1ebe5d' },
                    }}
                  >
                    WhatsApp Booking
                  </Button>

                  <Button
                    component="a"
                    href={`tel:${siteConfig.contact.phoneIntl}`}
                    variant="outlined"
                    fullWidth
                    startIcon={<PhoneIcon />}
                    sx={{
                      borderColor: '#FF7700',
                      color: '#C65102',
                      fontWeight: 700,
                      py: 1.2,
                      borderRadius: 50,
                      borderWidth: 1.5,
                      mb: 1.5,
                    }}
                  >
                    Call {siteConfig.contact.phone}
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#8C6D53' }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: '#FF7700' }} />
                    <Typography variant="caption" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                      {siteConfig.contact.addressLine1}, {siteConfig.contact.addressLine2}
                    </Typography>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          ) : (
            // Desktop Menu
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.name}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: 'white',
                      fontWeight: isActive ? 700 : 500,
                      px: 2,
                      py: 0.8,
                      borderRadius: 50,
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                      backdropFilter: isActive ? 'blur(8px)' : 'none',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}

              {/* Call pill with live indicator */}
              <Button
                component="a"
                href={`tel:${siteConfig.contact.phoneIntl}`}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  borderRadius: 50,
                  px: 2,
                  py: 0.8,
                  ml: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.26)',
                    borderColor: '#FFFFFF',
                  },
                }}
              >
                <span className="live-indicator-dot" />
                <PhoneIcon sx={{ fontSize: 17 }} />
                <Box component="span" sx={{ display: { xs: 'none', lg: 'inline' } }}>{siteConfig.contact.phone}</Box>
                <Box component="span" sx={{ display: { xs: 'inline', lg: 'none' } }}>Call</Box>
              </Button>

              {/* WhatsApp Action Button */}
              <Button
                component="a"
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<WhatsAppIcon />}
                sx={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  fontWeight: 700,
                  px: 2.4,
                  py: 0.9,
                  borderRadius: 50,
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                  '&:hover': {
                    backgroundColor: '#1ebe5d',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.55)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                WhatsApp
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteConfig } from '../config';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Poojas', path: '/poojas' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#FF9933',
        borderBottom: '3px solid #FFD700',
        boxShadow: '0 2px 8px rgba(255,153,51,0.3)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 }, minHeight: { xs: 64, md: 80 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            🕉️ Divine Pooja Services
          </Typography>

          {isMobile ? (
            // Mobile Menu
            <Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #FFD700',
                  },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    component={Link}
                    to={item.path}
                    onClick={handleClose}
                    sx={{
                      color: '#FF9933',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#FFE4B5',
                        color: '#2C1810',
                      },
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
                <MenuItem
                  component="a"
                  href={`tel:${siteConfig.contact.phoneIntl}`}
                  onClick={handleClose}
                  sx={{
                    backgroundColor: '#FFD700',
                    color: '#2C1810',
                    mx: 1,
                    my: 0.5,
                    borderRadius: 1,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#FF9933', color: 'white' },
                  }}
                >
                  Call {siteConfig.contact.phone}
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            // Desktop Menu
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    '&:hover': {
                      color: '#FFD700',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
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
                  fontWeight: 600,
                  ml: 1,
                  '&:hover': { backgroundColor: '#1ebe5d' },
                }}
              >
                Book on WhatsApp
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
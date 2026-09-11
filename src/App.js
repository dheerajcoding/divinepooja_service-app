import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import PoojaList from './pages/PoojaList';
import PoojaDetail from './pages/PoojaDetail';
import Booking from './pages/Booking';
import Login from './pages/Login';
import BookingConfirmation from './pages/BookingConfirmation';
import Admin from './pages/Admin';
import Packages from './pages/Packages';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InstallPrompt from './components/InstallPrompt';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFab from './components/WhatsAppFab';
import MobileBottomBar from './components/MobileBottomBar';
import NotFound from './pages/NotFound';
import { DataProvider } from './context/DataContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7700', // Rich spiritual saffron
      light: '#FFA040',
      dark: '#C65102',
    },
    secondary: {
      main: '#E5A910', // Vedic temple gold
      light: '#FFD966',
      dark: '#A67907',
    },
    background: {
      default: '#FFFDF8', // Sacred cream background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E110A', // Deep velvety dark brown
      secondary: '#664E3D', // Warm earthy brown
    },
    success: {
      main: '#25D366', // WhatsApp & success green
    },
    warning: {
      main: '#E5A910',
    },
    error: {
      main: '#E53E3E',
    },
  },
  typography: {
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 700,
      fontSize: '2.6rem',
      color: '#1E110A',
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 700,
      fontSize: '2.1rem',
      color: '#1E110A',
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#1E110A',
      letterSpacing: '0.015em',
    },
    h4: {
      fontFamily: '"Cinzel", serif',
      fontWeight: 600,
      fontSize: '1.45rem',
      color: '#1E110A',
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#FF7700',
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      fontSize: '1.05rem',
      color: '#1E110A',
    },
    body1: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: '0.9rem',
      lineHeight: 1.55,
    },
    button: {
      fontFamily: '"Outfit", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF7700 0%, #E5A910 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(255, 119, 0, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E66A00 0%, #C6920D 100%)',
            boxShadow: '0 6px 20px rgba(255, 119, 0, 0.45)',
          },
        },
        outlined: {
          borderColor: '#FF7700',
          borderWidth: '1.5px',
          color: '#FF7700',
          '&:hover': {
            backgroundColor: 'rgba(255, 119, 0, 0.08)',
            borderColor: '#C65102',
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 8px 24px rgba(198, 81, 2, 0.08)',
          border: '1px solid rgba(229, 169, 16, 0.22)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 16px 36px -8px rgba(198, 81, 2, 0.2)',
            transform: 'translateY(-5px)',
            borderColor: 'rgba(229, 169, 16, 0.45)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 119, 0, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 215, 0, 0.35)',
          boxShadow: '0 4px 20px rgba(198, 81, 2, 0.15)',
        },
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          <ScrollToTop />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ flex: 1, pb: { xs: '70px', md: 0 } }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/poojas" element={<PoojaList />} />
                <Route path="/pooja/:id" element={<PoojaDetail />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/confirmation" element={<BookingConfirmation />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
            <WhatsAppFab />
            <MobileBottomBar />
            <InstallPrompt />
          </Box>
        </DataProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

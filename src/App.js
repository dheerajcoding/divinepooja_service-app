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
import NotFound from './pages/NotFound';
import { DataProvider } from './context/DataContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9933', // Traditional saffron/orange
      light: '#FFD700',
      dark: '#CC7A00',
    },
    secondary: {
      main: '#FFD700', // Gold accent
      light: '#FFE4B5',
      dark: '#CCAA00',
    },
    background: {
      default: '#FFF8DC', // Traditional cream background
      paper: '#ffffff', // Pure white for cards
    },
    text: {
      primary: '#2C1810', // Rich brown text
      secondary: '#5D4E37', // Medium brown for secondary text
    },
    success: {
      main: '#38a169', // Professional green
    },
    warning: {
      main: '#d69e2e', // Professional amber
    },
    error: {
      main: '#e53e3e', // Professional red
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#2C1810',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#2C1810',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#2C1810',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#2C1810',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#FF9933',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#FF9933',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 153, 51, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #E6892E 0%, #CCAA00 100%)',
          },
        },
        outlined: {
          borderColor: '#FF9933',
          color: '#FF9933',
          '&:hover': {
            backgroundColor: 'rgba(255, 153, 51, 0.1)',
            borderColor: '#E6892E',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #FFE4B5',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(255, 153, 51, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF9933',
          color: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
            <Box sx={{ flex: 1 }}>
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
            <InstallPrompt />
          </Box>
        </DataProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

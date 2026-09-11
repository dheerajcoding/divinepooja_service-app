import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardMedia,
  Chip,
  Button,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteConfig } from '../config';
import { useData } from '../context/DataContext';

const About = () => {
  const { stats } = useData();

  const values = [
    {
      icon: <AccountBalanceIcon sx={{ color: '#FF7700', fontSize: 40 }} />,
      title: 'Authentic Traditions',
      description: 'We follow ancient Vedic traditions, Vedic chanting, and procedures with utmost devotion and precision.',
    },
    {
      icon: <PeopleIcon sx={{ color: '#FF7700', fontSize: 40 }} />,
      title: 'Expert Priests',
      description: 'Our certified pandits have 8–20+ years of ritual experience and are well-versed in Hindi, Sanskrit, and regional customs.',
    },
    {
      icon: <StarIcon sx={{ color: '#FF7700', fontSize: 40 }} />,
      title: 'Pristine Samagri',
      description: 'We bring fresh flowers, pure ghee, havan wood, and premium sacred materials directly to your doorstep.',
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ color: '#25D366', fontSize: 40 }} />,
      title: 'Devotee Satisfaction',
      description: 'Trusted by over 1,200+ families for housewarming, satyanarayan katha, wedding, and festive poojas.',
    },
  ];

  const certifications = [
    'Certified Traditional Vedic Priests',
    'Pure & Authentic Samagri Sourcing',
    'Timely Pandit Arrival Guarantee',
    'Transparent & Fair Dakshina Pricing',
    'Custom Gotra & Regional Custom Adherence',
  ];

  const teamMembers = [
    {
      name: 'Pandit Rajesh Sharma',
      role: 'Chief Priest & Founder',
      experience: '12+ years',
      specialization: 'Satyanarayan & Family Griha Poojas',
      image: '/images/image15.png',
      languages: ['Sanskrit', 'Hindi', 'English'],
    },
    {
      name: 'Pandit Vijay Singh',
      role: 'Senior Priest',
      experience: '15+ years',
      specialization: 'Maha Lakshmi & Navgrah Shanti',
      image: '/images/image17.avif',
      languages: ['Hindi', 'Sanskrit'],
    },
    {
      name: 'Pandit Sanjay Mishra',
      role: 'Vedic Ritual Specialist',
      experience: '10+ years',
      specialization: 'Rudra Abhishek & Maha Mrityunjaya',
      image: '/images/image16.jpg',
      languages: ['Hindi', 'Bengali', 'Sanskrit'],
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Sacred Beginnings',
      description: `${siteConfig.brand.name} was established with a heartfelt vision to make authentic Vedic poojas accessible to modern households.`,
    },
    {
      year: '2024',
      title: 'Pristine Samagri & Pandit Network',
      description: 'Expanded doorstep services with complete all-inclusive samagri kits and verified local pandits.',
    },
    {
      year: '2025',
      title: '1,000+ Happy Devotee Milestone',
      description: 'Crossed over 1,200 poojas completed with a 4.9/5 star satisfaction rate across residential communities.',
    },
    {
      year: '2026',
      title: 'Digital Platform Launch',
      description: 'Launched the new interactive platform for instant WhatsApp booking, muhurat guidance, and transparent packages.',
    },
  ];

  const galleryImages = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFDF8', py: { xs: 4, sm: 6 } }}>
      <Container maxWidth="lg">
        {/* Page Hero Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.2rem' },
            }}
          >
            🕉️ About {siteConfig.brand.name}
          </Typography>
          <Typography variant="h6" sx={{ color: '#664E3D', maxWidth: 780, mx: 'auto', fontWeight: 500, fontSize: { xs: '1rem', md: '1.2rem' } }}>
            Bridging ancient Vedic wisdom with modern ease — delivering devotion, authentic rituals, and experienced pandit ji directly to your home.
          </Typography>
        </Box>

        {/* Story Section */}
        <Paper
          className="glass-card"
          sx={{
            p: { xs: 2.5, sm: 4, md: 5 },
            mb: { xs: 5, md: 7 },
            borderRadius: { xs: 3, sm: 5 },
            border: '1.5px solid rgba(229, 169, 16, 0.35)',
            boxShadow: '0 12px 36px rgba(198, 81, 2, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#C65102',
              fontWeight: 800,
              textAlign: 'center',
              fontSize: { xs: '1.45rem', sm: '1.9rem' },
              mb: 2,
            }}
          >
            Our Sacred Mission & Journey
          </Typography>
          <Typography variant="body1" sx={{ color: '#4A3728', lineHeight: 1.8, textAlign: 'center', maxWidth: 880, mx: 'auto', fontSize: { xs: '0.98rem', sm: '1.05rem' } }}>
            Founded with a deep devotion to Vedic heritage, <strong>{siteConfig.brand.name}</strong> was born from a simple realization: in today's fast-paced world, organizing a traditional pooja with the right muhurat, a qualified pandit ji, and all authentic samagri should not be stressful.
            <br /><br />
            Today, our family of expert pandits serves over <strong>{stats.happyCustomers}+</strong> households, completing more than <strong>{stats.totalPoojas}+</strong> rituals. Whether it is a peaceful Griha Pravesh, a joyful Satyanarayan Katha, or a sacred Havan, we ensure every mantra is chanted with reverence, purity, and spiritual devotion.
          </Typography>
        </Paper>

        {/* Values Section */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.1rem' },
              mb: 4,
            }}
          >
            Our Core Pillars
          </Typography>
          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item key={index} xs={12} sm={6} lg={3}>
                <Card
                  className="glass-card"
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 4,
                    p: 1.5,
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 119, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Cinzel", serif',
                        color: '#1E110A',
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        mb: 1.5,
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D', lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Standards & Live Impact Grid */}
        <Grid container spacing={4} sx={{ mb: { xs: 5, md: 7 } }}>
          <Grid item xs={12} md={6}>
            <Paper
              className="glass-card"
              sx={{
                p: { xs: 3, sm: 4 },
                height: '100%',
                borderRadius: 4,
                border: '1.5px solid rgba(229, 169, 16, 0.35)',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontFamily: '"Cinzel", serif',
                  color: '#C65102',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.45rem' },
                  mb: 2.5,
                }}
              >
                🏆 Vedic Standards & Commitments
              </Typography>
              <List sx={{ py: 0 }}>
                {certifications.map((cert, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon sx={{ color: '#25D366' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={cert}
                      primaryTypographyProps={{ style: { color: '#331C10', fontWeight: 600, fontSize: '0.95rem' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              className="glass-card"
              sx={{
                p: { xs: 3, sm: 4 },
                height: '100%',
                borderRadius: 4,
                border: '1.5px solid rgba(229, 169, 16, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontFamily: '"Cinzel", serif',
                  color: '#C65102',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.45rem' },
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                📊 Devotee Trust & Impact
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <Typography variant="h3" sx={{ fontFamily: '"Cinzel", serif', color: '#FF7700', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem' } }}>
                      {stats.totalPoojas}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D', fontWeight: 600 }}>
                      Poojas Performed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <Typography variant="h3" sx={{ fontFamily: '"Cinzel", serif', color: '#FF7700', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem' } }}>
                      {stats.happyCustomers}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D', fontWeight: 600 }}>
                      Devotee Families
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <Typography variant="h3" sx={{ fontFamily: '"Cinzel", serif', color: '#FF7700', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem' } }}>
                      {stats.experiencedPriests}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D', fontWeight: 600 }}>
                      Expert Pandits
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5 }}>
                    <Typography variant="h3" sx={{ fontFamily: '"Cinzel", serif', color: '#FF7700', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem' } }}>
                      {stats.yearsOfService}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D', fontWeight: 600 }}>
                      Years Of Service
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Team Priests Section */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.1rem' },
              mb: 4,
            }}
          >
            👨‍🏫 Meet Our Experienced Pandits
          </Typography>
          <Grid container spacing={3.5}>
            {teamMembers.map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  className="glass-card"
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box className="card-zoom-media" sx={{ height: 260, position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={member.image}
                      alt={member.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                      <Chip
                        label={`${member.experience} Exp.`}
                        sx={{
                          backgroundColor: '#FF7700',
                          color: 'white',
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Cinzel", serif',
                        color: '#1E110A',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        mb: 0.5,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: '#C65102', fontWeight: 600, mb: 1.5 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D', mb: 1 }}>
                      <strong>Specialization:</strong> {member.specialization}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#664E3D' }}>
                      <strong>Languages:</strong> {member.languages.join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Responsive Timeline */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.1rem' },
              mb: 4,
            }}
          >
            📅 Our Growth Timeline
          </Typography>
          <Box sx={{ maxWidth: 750, mx: 'auto' }}>
            {timeline.map((event, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1, sm: 2.5 },
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    minWidth: { xs: 'auto', sm: 80 },
                    textAlign: { xs: 'left', sm: 'center' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <TimelineIcon sx={{ color: '#FF7700', fontSize: 26 }} />
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: '"Cinzel", serif', color: '#C65102', fontWeight: 800 }}
                  >
                    {event.year}
                  </Typography>
                </Box>
                <Paper
                  className="glass-card"
                  sx={{
                    flex: 1,
                    width: '100%',
                    p: 2.5,
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontFamily: '"Cinzel", serif', color: '#1E110A', fontWeight: 700, mb: 0.5 }}
                  >
                    {event.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#664E3D', lineHeight: 1.6 }}>
                    {event.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Gallery Section */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontFamily: '"Cinzel", serif',
              color: '#1E110A',
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2.1rem' },
              mb: 4,
            }}
          >
            📸 Glimpses of Divine Poojas
          </Typography>
          <Grid container spacing={2}>
            {galleryImages.map((image, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  className="glass-card"
                  sx={{
                    borderRadius: 3.5,
                    overflow: 'hidden',
                    height: 220,
                  }}
                >
                  <Box className="card-zoom-media" sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={image}
                      alt={`Pooja moment ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bottom Contact Callout */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 6 },
            textAlign: 'center',
            borderRadius: { xs: 3, sm: 5 },
            background: 'linear-gradient(135deg, rgba(255, 248, 235, 0.95) 0%, rgba(255, 238, 204, 0.85) 100%)',
            border: '2px solid rgba(229, 169, 16, 0.4)',
            boxShadow: '0 12px 36px rgba(198, 81, 2, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: '"Cinzel", serif',
              color: '#C65102',
              fontWeight: 800,
              fontSize: { xs: '1.35rem', sm: '1.8rem', md: '2.1rem' },
            }}
          >
            🕉️ Consult With Our Pandit Ji
          </Typography>
          <Typography variant="body1" sx={{ color: '#664E3D', maxWidth: 680, mx: 'auto', mb: 3.5, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
            Have questions about pooja vidhi, auspicious dates, or custom ritual requirements? Reach out directly.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component="a"
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              sx={{
                backgroundColor: '#25D366',
                color: 'white',
                fontWeight: 700,
                px: 3.5,
                py: 1.5,
                borderRadius: 50,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 320, sm: 'none' },
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                '&:hover': { backgroundColor: '#1ebe5d' },
              }}
            >
              WhatsApp Us
            </Button>
            <Button
              variant="outlined"
              component="a"
              href={`tel:${siteConfig.contact.phoneIntl}`}
              startIcon={<PhoneIcon />}
              sx={{
                borderColor: '#FF7700',
                color: '#FF7700',
                fontWeight: 700,
                px: 3.5,
                py: 1.5,
                borderRadius: 50,
                borderWidth: 2,
                backgroundColor: 'white',
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: 320, sm: 'none' },
                '&:hover': {
                  borderColor: '#C65102',
                  backgroundColor: 'rgba(255, 119, 0, 0.08)',
                  borderWidth: 2,
                },
              }}
            >
              Call {siteConfig.contact.phone}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
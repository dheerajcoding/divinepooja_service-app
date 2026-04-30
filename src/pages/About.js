import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Paper, List, ListItem, ListItemText, ListItemIcon, CardMedia, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';

const About = () => {
  const values = [
    {
      icon: <AccountBalanceIcon sx={{ color: '#2b6cb0', fontSize: 40 }} />,
      title: 'Authentic Traditions',
      description: 'We follow ancient Vedic traditions and procedures with utmost devotion and precision.'
    },
    {
      icon: <PeopleIcon sx={{ color: '#2b6cb0', fontSize: 40 }} />,
      title: 'Expert Priests',
      description: 'Our priests have 12-20 years of experience and are well-versed in multiple languages.'
    },
    {
      icon: <StarIcon sx={{ color: '#2b6cb0', fontSize: 40 }} />,
      title: 'Quality Service',
      description: 'We maintain the highest standards of service with genuine materials and proper rituals.'
    },
    {
      icon: <CheckCircleIcon sx={{ color: '#2b6cb0', fontSize: 40 }} />,
      title: 'Customer Satisfaction',
      description: 'Over 892+ satisfied customers trust us for their spiritual needs.'
    }
  ];

  const certifications = [
    'Certified Vedic Priests',
    'Traditional Samagri Sourcing',
    'Quality Assurance Standards',
    'Customer Service Excellence',
    'Ethical Business Practices'
  ];

  const teamMembers = [
    {
      name: 'Pandit Rajesh Sharma',
      role: 'Chief Priest & Founder',
      experience: '8+ years',
      specialization: 'Satyanarayan & Family Poojas',
      image: '/images/image15.png',
      languages: ['Sanskrit', 'Hindi', 'English']
    },
    {
      name: 'Pandit Vijay Singh',
      role: 'Senior Priest',
      experience: '10+ years',
      specialization: 'Lakshmi & Wealth Poojas',
      image: '/images/image17.avif',
      languages: ['Hindi', 'Sanskrit', 'English']
    },
    {
      name: 'Pandit Sanjay Mishra',
      role: 'Specialist Priest',
      experience: '7+ years',
      specialization: 'Vishnu & Peace Poojas',
      image: '/images/image16.jpg',
      languages: ['Hindi', 'English', 'Bengali']
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Foundation',
      description: 'Divine Pooja Services was founded with a vision to bring authentic spiritual services to modern households.'
    },
    {
      year: '2024',
      title: 'Digital Platform Launch',
      description: 'Launched our online booking system, making spiritual services accessible 24/7 to our community.'
    },
    {
      year: '2025',
      title: 'Community Growth',
      description: 'Expanded to serve 892+ families with a dedicated team of 15+ expert priests.'
    },
    {
      year: '2025',
      title: 'Excellence Recognition',
      description: 'Received recognition for outstanding service quality and customer satisfaction in our first year.'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Continuing to innovate while preserving ancient traditions for future generations.'
    }
  ];

  const galleryImages = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg'
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f7fafc', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: '#1a365d',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            🕉️ About Divine Pooja Services
          </Typography>
          <Typography variant="h6" sx={{ color: '#4a5568', maxWidth: 800, mx: 'auto' }}>
            Bringing ancient spiritual traditions to your doorstep with devotion, authenticity, and excellence
          </Typography>
        </Box>

        {/* Story Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#1a365d', fontWeight: 'bold', textAlign: 'center' }}>
            Our Sacred Journey
          </Typography>
          <Typography variant="body1" sx={{ color: '#4a5568', lineHeight: 1.8, textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            Founded with a vision to make spiritual services accessible to everyone, Divine Pooja Services has been
            serving the community for over 1 year. Our journey began with a simple belief that everyone deserves
            to experience the divine blessings through proper Vedic rituals, regardless of their location or schedule.
            <br /><br />
            Today, we proudly serve over 892+ families across the region, conducting more than 1,247+ poojas
            with unwavering commitment to authenticity and excellence. Our team of 15+ experienced priests brings
            centuries-old wisdom to modern homes, ensuring that every ritual is performed with the same devotion
            and precision as in ancient temples.
          </Typography>
        </Paper>

        {/* Values Section */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1a365d', fontWeight: 'bold', mb: 4 }}>
          Our Core Values
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {values.map((value, index) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4a5568' }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Certifications Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                🏆 Our Certifications & Standards
              </Typography>
              <List>
                {certifications.map((cert, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#38a169' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={cert}
                      sx={{ '& .MuiListItemText-primary': { color: '#4a5568', fontWeight: '500' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                📊 Our Impact
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                  1,247+
                </Typography>
                <Typography variant="h6" sx={{ color: '#4a5568' }}>
                  Poojas Completed
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                  892+
                </Typography>
                <Typography variant="h6" sx={{ color: '#4a5568' }}>
                  Happy Families
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                  15+
                </Typography>
                <Typography variant="h6" sx={{ color: '#4a5568' }}>
                  Expert Priests
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                  1+
                </Typography>
                <Typography variant="h6" sx={{ color: '#4a5568' }}>
                  Years of Service
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Team Section */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1a365d', fontWeight: 'bold', mb: 4, mt: 6 }}>
          👨‍🏫 Meet Our Expert Priests
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {teamMembers.map((member, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={member.image}
                    alt={member.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Chip
                      label={`${member.experience} Exp.`}
                      sx={{
                        backgroundColor: '#1a365d',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#4a5568', fontWeight: '500', mb: 2 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4a5568', mb: 2 }}>
                    <strong>Specialization:</strong> {member.specialization}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4a5568', mb: 2 }}>
                    <strong>Languages:</strong> {member.languages.join(', ')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Timeline Section */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1a365d', fontWeight: 'bold', mb: 4 }}>
          📅 Our Journey Through Time
        </Typography>
        <Box sx={{ mb: 6 }}>
          {timeline.map((event, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
              <Box sx={{ minWidth: 100, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#1a365d', fontWeight: 'bold' }}>
                  {event.year}
                </Typography>
              </Box>
              <TimelineIcon sx={{ color: '#2b6cb0', mx: 2, fontSize: 30 }} />
              <Card
                sx={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4a5568' }}>
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Gallery Section */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1a365d', fontWeight: 'bold', mb: 4 }}>
          📸 Our Sacred Moments
        </Typography>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {galleryImages.map((image, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image}
                  alt={`Gallery image ${index + 1}`}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mission Statement */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mt: 6,
            background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#1a365d', fontWeight: 'bold' }}>
            Our Mission
          </Typography>
          <Typography variant="h6" sx={{ color: '#4a5568', maxWidth: 800, mx: 'auto', lineHeight: 1.6, mb: 3 }}>
            "To preserve and propagate ancient Vedic traditions while making spiritual services accessible,
            affordable, and authentic for modern households. We strive to bring peace, prosperity, and divine
            blessings to every home through proper rituals and genuine devotion."
          </Typography>
          <Typography variant="body1" sx={{ color: '#4a5568', maxWidth: 900, mx: 'auto', lineHeight: 1.7 }}>
            At Divine Pooja Services, we believe that spirituality should not be a luxury but a way of life.
            Our commitment extends beyond performing rituals - we educate, guide, and support our community
            in their spiritual journey. Every pooja we conduct is a sacred bridge between the ancient wisdom
            of our ancestors and the modern aspirations of today's families.
          </Typography>
        </Paper>

        {/* Service Guarantee */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mt: 4,
            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#1a365d', fontWeight: 'bold' }}>
            🛡️ Our Service Guarantee
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <CheckCircleIcon sx={{ color: '#38a169', fontSize: 40, mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 1 }}>
                  Authentic Rituals
                </Typography>
                <Typography variant="body2">
                  Every ritual follows traditional Vedic procedures with precision
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ color: '#38a169', fontSize: 40, mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 1 }}>
                  Expert Priests
                </Typography>
                <Typography variant="body2">
                  Qualified priests with extensive experience and knowledge
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <StarIcon sx={{ color: '#38a169', fontSize: 40, mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 1 }}>
                  Quality Materials
                </Typography>
                <Typography variant="body2">
                  Genuine samagri and materials sourced from traditional suppliers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <GroupsIcon sx={{ color: '#38a169', fontSize: 40, mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#1a365d', fontWeight: 'bold', mb: 1 }}>
                  Community Support
                </Typography>
                <Typography variant="body2">
                  Ongoing spiritual guidance and community engagement
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
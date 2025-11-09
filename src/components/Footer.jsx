import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Facebook,
    Twitter,
    LinkedIn,
    Instagram
} from '@mui/icons-material';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1a237e',
                color: 'white',
                py: 6,
                mt: 'auto',
                position:'sticky'
            }}
        >
            <Container maxWidth="lg">
                {/* Main Footer Content */}
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                mb: 2
                            }}
                        >
                            JobBoard
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                maxWidth: '400px',
                                lineHeight: 1.6
                            }}
                        >
                            Find your dream job with our advanced recruitment platform.
                        </Typography>

                        {/* Social Media Links */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <LinkedIn />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <Instagram />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={4}>
                            {/* Site Map Column */}
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Site Map
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {[
                                        'Browse Jobs',
                                        'Post a Job',
                                        'For Employers',
                                        'Job Categories',
                                        'Resources',
                                        'Contact Us',
                                        'Company Portal'
                                    ].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            sx={{
                                                color: 'rgba(255,255,255,0.8)',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    color: 'white',
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </Box>
                            </Grid>


                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Legal
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {[
                                        'Privacy Policy',
                                        'Terms of Services',
                                        'Cookie Policy',
                                        'Data Protection'
                                    ].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            sx={{
                                                color: 'rgba(255,255,255,0.8)',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    color: 'white',
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


                <Divider

                    sx={{
                        my: 4,
                        backgroundColor: 'rgba(255,255,255,0.3)'
                    }}
                />
                <Box
                    sx={{
                         display: 'flex',
                         flexDirection: isMobile ? 'column' : 'row',
                         justifyContent: 'space-between',
                         alignItems: isMobile ? 'flex-start' : 'center',
                         gap: 2
                     }}
                 >
                     <Typography 
                         variant="body2"
                         sx={{ color: 'rgba(255,255,255,0.7)' }}
                 >
                         Copyright © 2024-cse JobBoard
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                        Making Careers Better
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer ;




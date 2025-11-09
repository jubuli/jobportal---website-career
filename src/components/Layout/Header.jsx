


import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const navItems = [
    { label: "JOBLIST", path: "/" },
    { label: "POSTJOB", path: "/add-job" },
  ];

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          borderRadius: "1px 5px 1px 5px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(133,124,124,0.9)",
          background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "inherit",
                  letterSpacing: "0.5px",
                }}
              >
                JOBPORTAL
              </Typography>
            </Box>

            {/* Desktop Buttons */}
            {!isMobile && (
              <Box>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    variant={
                      location.pathname === item.path ? "outlined" : "text"
                    }
                    sx={{
                      ml: 2,
                      borderRadius: "50px",
                      textTransform: "none",
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      fontSize: "0.95rem",
                      background:
                        location.pathname === item.path
                          ? "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)"
                          : "transparent",
                      color:
                        location.pathname === item.path ? "#fff" : "white",
                      boxShadow:
                        location.pathname === item.path
                          ? "0 3px 10px rgba(0,0,0,0.2)"
                          : "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: "white", ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            background: "linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)",
            height: "100%",
            color: "white",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              JOBPORTAL
            </Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.path}
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                    color:
                      location.pathname === item.path ? "secondary.main" : "white",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;

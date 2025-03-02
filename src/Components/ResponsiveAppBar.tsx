// src/components/ResponsiveAppBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Dashboard', 'SdgForm'];

const ResponsiveAppBar = ({ onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page.toLowerCase());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#212121",
        width: "100%",
        top: 0,
        left: 0,
      }}
    >
      <Toolbar>
        {/* Left aligned logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6">
            SDG3 Classifier
          </Typography>
        </Box>

        {/* Left aligned buttons */}
        <Box sx={{ display: 'flex' }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              sx={{
                color: 'white',
                marginLeft: 2, // Adjust spacing between buttons
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;

'use client';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import React from 'react';
import { grey } from '@/color';

const MoneygerAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: grey[0], color: grey[900] }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            moneyGer
          </Typography>
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MoneygerAppBar;

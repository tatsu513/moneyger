'use client';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import { grey } from '@/color';

const MoneygerAppBar = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: grey[0], color: grey[900] }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            moneyGer
          </Typography>
          <IconButton color="inherit">
            <AccountCircle fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MoneygerAppBar;

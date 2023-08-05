'use client';

import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import { grey } from '@/color';
import { signOut } from 'next-auth/react';

const MoneygerAppBar = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchor(null);
  }, []);
  const handleLogout = useCallback(() => {
    signOut({
      callbackUrl: '/auth/login',
    });
  }, []);
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: grey[0], color: grey[900] }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            moneyGer
          </Typography>
          <Box>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchor}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MoneygerAppBar;

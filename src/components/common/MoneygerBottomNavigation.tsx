'use client';
import React, { useCallback, useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const payment = 'Payment';
const paymentHistory = 'paymentHistory';
type Navigation = typeof payment | typeof paymentHistory;

const navigationSchema = z.enum([payment, paymentHistory]);

const MoneygerBottomNavigation = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<Navigation>(payment);

  const handleChange = useCallback(
    (_e: React.SyntheticEvent<Element, Event>, newValue: Navigation) => {
      const result = navigationSchema.safeParse(newValue);
      if (!result.success) {
        console.error('不正なナビゲーションが選択されました');
        return;
      }
      setSelected(result.data);
      switch (result.data) {
        case payment:
          router.push('/payments');
          break;
        case paymentHistory:
          router.push('/payment-histories');
      }
    },
    [router],
  );

  return (
    <Box>
      <BottomNavigation showLabels value={selected} onChange={handleChange}>
        <BottomNavigationAction
          value={payment}
          label="収支一覧"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          value={paymentHistory}
          label="支払履歴"
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default MoneygerBottomNavigation;

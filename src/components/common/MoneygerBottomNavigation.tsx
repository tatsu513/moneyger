'use client';
import React, { useCallback, useMemo } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Typography,
} from '@mui/material';
import {
  Payments as PaymentsIcon,
  Summarize as SummarizeIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { z } from 'zod';
import { usePathname, useRouter } from 'next/navigation';

const home = 'home';
const payment = 'Payment';
const paymentHistory = 'paymentHistory';
const navigationSchema = z.enum([home, payment, paymentHistory]);
type NavigationType = z.infer<typeof navigationSchema>;

const MoneygerBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedValue = useMemo(() => {
    if (pathname == null) return home;
    if (/payment-histories/.test(pathname)) {
      return paymentHistory;
    }
    if (/payments/.test(pathname)) {
      return payment;
    }
    return home;
  }, [pathname]);

  const handleChange = useCallback(
    (_e: React.SyntheticEvent<Element, Event>, newValue: NavigationType) => {
      const result = navigationSchema.safeParse(newValue);
      if (!result.success) {
        console.error('不正なナビゲーションが選択されました');
        return;
      }
      switch (result.data) {
        case home:
          router.push('/');
          break;
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
      <Divider />
      <BottomNavigation
        showLabels
        value={selectedValue}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value={home}
          label={<Typography variant="bottomNavigation">ホーム</Typography>}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          value={payment}
          label={<Typography variant="bottomNavigation">家計簿</Typography>}
          icon={<SummarizeIcon />}
        />
        <BottomNavigationAction
          value={paymentHistory}
          label={<Typography variant="bottomNavigation">お支払い</Typography>}
          icon={<PaymentsIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default MoneygerBottomNavigation;

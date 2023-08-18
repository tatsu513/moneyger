'use client';
import React, { useCallback, useMemo } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Typography,
} from '@mui/material';
import * as PaymentsIcon from '@mui/icons-material/Payments';
import * as SummarizeIcon from '@mui/icons-material/Summarize';
import * as HomeIcon from '@mui/icons-material/Home';
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
          icon={<HomeIcon.default />}
        />
        <BottomNavigationAction
          value={payment}
          label={<Typography variant="bottomNavigation">費目</Typography>}
          icon={<SummarizeIcon.default />}
        />
        <BottomNavigationAction
          value={paymentHistory}
          label={<Typography variant="bottomNavigation">支払い</Typography>}
          icon={<PaymentsIcon.default />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default MoneygerBottomNavigation;

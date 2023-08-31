'use client';
import React, { useCallback, useMemo } from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Typography,
} from '@mui/material';
import * as PaymentIcon from '@mui/icons-material/Payment';
import * as HomeIcon from '@mui/icons-material/Home';
import * as SettingsIcon from '@mui/icons-material/Settings';
import { z } from 'zod';
import { usePathname, useRouter } from 'next/navigation';

const home = 'home';
const paymentHistory = 'paymentHistory';
const setting = 'Setting';
const navigationSchema = z.enum([home, setting, paymentHistory]);
type NavigationType = z.infer<typeof navigationSchema>;

const MoneygerBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedValue = useMemo(() => {
    if (pathname == null) return home;
    if (/payment-histories/.test(pathname)) {
      return paymentHistory;
    }
    if (/setting/.test(pathname)) {
      return setting;
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
        case setting:
          router.push('/setting');
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
          value={paymentHistory}
          label={<Typography variant="bottomNavigation">支払い</Typography>}
          icon={<PaymentIcon.default />}
        />
        <BottomNavigationAction
          value={setting}
          label={<Typography variant="bottomNavigation">設定</Typography>}
          icon={<SettingsIcon.default />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default MoneygerBottomNavigation;

'use client';

import React, { useCallback, useMemo } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { usePathname, useRouter } from 'next/navigation';

const category = 'Category';
const label = 'Label';

const SettingTab: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const value = useMemo(() => {
    switch (pathname) {
      case '/setting/categories':
        return category;
      case '/setting/labels':
        return label;
      default:
        return category;
    }
  }, [pathname]);

  const handleChange = useCallback(
    (_e: React.SyntheticEvent, newValue: string) => {
      switch (newValue) {
        case category:
          router.push('/setting/categories');
          break;
        case label:
          router.push('/setting/labels');
          break;
        default:
          console.warn('不正な遷移です。何も起こりません');
          break;
      }
    },
    [router],
  );

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
          <Tab label="費目" value="Category" />
          <Tab label="ラベル" value="Label" />
        </TabList>
      </Box>
    </TabContext>
  );
};

export default SettingTab;

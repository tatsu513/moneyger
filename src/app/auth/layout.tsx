import type { Metadata } from 'next';
import { Box } from '@mui/material';
import MoneygerAppBar from '@/app/_layout/MoneygerAppBar';

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'moneygerへログインします',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100dvh"
      width="100dvw"
      maxWidth="900px"
      m="0 auto"
      pt="env(safe-area-inset-top)"
      pr="env(safe-area-inset-right)"
      pb="env(safe-area-inset-bottom)"
      pl="env(safe-area-inset-left)"
    >
      <MoneygerAppBar isAuthPage />
      <Box p={2}>{children}</Box>
    </Box>
  );
}

import type { Metadata } from 'next';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'moneygerへログインします',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <Box p={2}>{children}</Box>;
}

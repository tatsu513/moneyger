import type { Metadata } from 'next';
import Providers from '@/app/Providers';

export const metadata: Metadata = {
  title: 'moneyger',
  description: 'Generated by create next app',
  viewport: {
    initialScale: 1,
    viewportFit: 'cover',
    width: 'device-width',
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

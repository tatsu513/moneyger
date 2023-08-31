import SettingTab from "@/app/setting/_layout/SettingTab";
import PageTitle from "@/components/common/PageTitle";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTitle title="設定" />
      {/* MainTemplateのpaddingを無視して横幅いっぱいにする */}
      <Box sx={{ mx: 'calc(((100vw - 100%) / 2) * -1)' }}>
        <SettingTab />
      </Box>
      <Box my={2}>{children}</Box>
    </>
  );
}

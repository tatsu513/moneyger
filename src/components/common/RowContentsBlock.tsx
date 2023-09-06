import { Box, Divider, Typography } from "@mui/material";

type Props = {
  title: string;
  body: React.ReactNode
}

const RowContentsBlock: React.FC<Props> = ({ title, body }) => {
  return (
    <>
      <Divider />
      <Box my={2} px={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" flex={1}>{title}</Typography>
        <Box flex={4} textAlign="right">{body}</Box>
      </Box>
    </>
  )
}

export default RowContentsBlock
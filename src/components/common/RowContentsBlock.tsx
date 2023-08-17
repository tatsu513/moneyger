import { Box, Divider, Typography } from "@mui/material";

type Props = {
  title: string;
  body: string
}

const RowContentsBlock: React.FC<Props> = ({ title, body }) => {
  return (
    <>
      <Divider />
      <Box my={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" flex={1}>{title}</Typography>
        <Typography variant="body1" flex={4} textAlign="right">{body}</Typography>
      </Box>
    </>
  )
}

export default RowContentsBlock
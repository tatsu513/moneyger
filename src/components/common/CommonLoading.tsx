import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import { Typography } from '@mui/material'

type Props = {
  height?: number | string
}
const CommonLoading: React.FC<Props> = ({ height = 400 }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      rowGap={2}
      height={height}
      color={grey[400]}
    >
      <CircularProgress />
      <Typography variant='body1'>LOADING...</Typography>
    </Box>
  )
}

export default CommonLoading

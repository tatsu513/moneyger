import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'

type Props = {
  height?: number | string
}
const CommonLoading: React.FC<Props> = ({ height = 400 }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={height}
      color={grey[400]}
    >
      <CircularProgress />
    </Box>
  )
}

export default CommonLoading

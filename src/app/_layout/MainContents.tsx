'use client'
import { Box } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const MainContents: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box p={2}>{children}</Box>
}

export default MainContents

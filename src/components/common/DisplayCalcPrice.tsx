'use client'
import getDisplayCalcPrice from 'src/logics/getDisplayCalcPrice'
import React from 'react'
import { Typography } from '@mui/material'
import { green, grey, red } from '@mui/material/colors'

type Props = {
  currentPrice: number
  limitPrice: number
}

const DisplayCalcPrice: React.FC<Props> = ({ currentPrice, limitPrice }) => {
  const color = (() => {
    const price = currentPrice - limitPrice
    if (price === 0) return grey[900]
    if (price > 0) return red[900]
    return green[900]
  })()
  return (
    <Typography color={color} variant="caption">
      {getDisplayCalcPrice(currentPrice, limitPrice)}
    </Typography>
  )
}

export default DisplayCalcPrice

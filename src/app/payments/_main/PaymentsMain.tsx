import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import PaymentListItem from '@/app/payments/_main/PaymentListItem'

type Data = {
  title: string
  limitPrice: number
}

const PaymentsMain = async () => {
  const response = await fetch('http://localhost:3000/api/payments')
  const list = (await response.json()) as Data[]
  return (
    <Box>
      <Typography variant="h3">LIST</Typography>
      <Divider />
      {list.map((i) => (
        <PaymentListItem
          key={i.title}
          title={i.title}
          currentPrice={5000}
          limitPrice={i.limitPrice}
        />
      ))}
    </Box>
  )
}

export default PaymentsMain

const list = [
  {
    title: '食費',
    currentPrice: 20000,
    limitPrice: 25000,
  },
  {
    title: 'いつ栞',
    currentPrice: 15000,
    limitPrice: 35000,
  },
]

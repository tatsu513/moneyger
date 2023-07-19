"use client"

import { Box, Divider, Typography } from "@mui/material"
import React, { Suspense } from "react"
import CommonLoading from "@/components/common/CommonLoading"
import FetchErrorBoundary from "@/components/common/FetchErrorBoundary"
import ListPaymentWithSuspense from "./ListPaymentWithSuspense"

const PaymentsMain = () => {
  return (
    <Box>
      <Typography variant="h3">LIST</Typography>
      <Divider />
      <FetchErrorBoundary>
        <Suspense fallback={<CommonLoading />}>
          <ListPaymentWithSuspense />
        </Suspense>
      </FetchErrorBoundary>
    </Box>
  )
}

export default PaymentsMain

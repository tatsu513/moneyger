import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ListItem from "@/app/accounts/_main/ListItem";

const AccountsMain = () => {
  return (
    <Box>
      <Typography variant="h3">LIST</Typography>
      <Divider />
      {list.map((i) => (
        <ListItem
          key={i.title}
          title={i.title}
          currentPrice={i.currentPrice}
          limitPrice={i.limitPrice}
        />
      ))}
    </Box>
  );
};

export default AccountsMain;

const list = [
  {
    title: "食費",
    currentPrice: 20000,
    limitPrice: 25000,
  },
  {
    title: "いつ栞",
    currentPrice: 15000,
    limitPrice: 35000,
  },
];

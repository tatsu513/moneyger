"use client";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

type Props = {
  itemId?: string;
};

const RegisterMain: React.FC<Props> = ({ itemId }) => {
  const selectedItem = options.find((o) => o.id === itemId);

  const [price, setPrice] = useState<string>("");
  const [item, setItem] = useState<Option | null>(selectedItem ?? null);
  const [date, setDate] = useState<DateTime | null>(DateTime.now());
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPrice(e.target.value);
    },
    []
  );
  const onChangeItem = useCallback(
    (_e: SyntheticEvent<Element, Event>, value: Option | null) => {
      setItem(value);
    },
    []
  );
  const onChangeDate = useCallback((date: DateTime | null) => {
    setDate(date);
  }, []);

  const submit = useCallback(() => {
    console.log(price, item, date);
  }, [price, item, date]);
  return (
    <Box>
      <Typography variant="h3">支払登録</Typography>

      <Box>
        <Typography variant="body1">支払日</Typography>
        <DatePicker
          value={date}
          onChange={onChangeDate}
          sx={{ width: "100%" }}
        />
      </Box>

      <Box>
        <Typography variant="body1">カテゴリ</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          fullWidth
          renderInput={(params) => <TextField {...params} label="カテゴリ" />}
        />
      </Box>

      <Box>
        <Typography variant="body1">金額</Typography>
        <TextField value={price} fullWidth onChange={onChange} />
      </Box>

      <Button onClick={submit}>登録する</Button>
    </Box>
  );
};

export default RegisterMain;

type Option = {
  id: string;
  label: string;
};
const options = [
  { id: "1", label: "食費" },
  { id: "2", label: "いつ栞" },
];

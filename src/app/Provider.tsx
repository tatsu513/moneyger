"use client";

import { LOCALIZATION_FORMATS } from "@/constants/localizationProviderFormats";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Settings } from "luxon";
import React, { PropsWithChildren, Provider } from "react";

Settings.defaultLocale = "ja-JP";
Settings.defaultZone = "Asia/Tokyo";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterLuxon}
      adapterLocale={Settings.defaultLocale}
      dateFormats={LOCALIZATION_FORMATS}
    >
      {children}
    </LocalizationProvider>
  );
};

export default Providers;

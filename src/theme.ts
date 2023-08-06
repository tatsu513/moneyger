import { createTheme } from '@mui/material/styles';
import { blue, green, grey, red } from 'src/color';

// font-size
const fontSize = {
  LLL: 32,
  LL: 28,
  L: 24,
  M: 20,
  S: 18,
  XS: 16,
  XXS: 14,
  XXXS: 12,
} as const;

// font-family
const fontFamilies = [
  'Noto Sans Japanese',
  'Hiragino Kaku Gothic ProN',
  'Meiryo',
  'sans-serif',
] as const;

const initialTheme = createTheme({
  typography: {
    // Global
    fontFamily: fontFamilies.join(','),
    fontSize: fontSize.XS,
    // Header
    // h1
    h1: {
      fontSize: fontSize.L,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h1Bold: {
      fontSize: fontSize.L,
      lineHeight: 1.5,
      fontWeight: 700,
    },
    // h2
    h2: {
      fontSize: fontSize.M,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h2Bold: {
      fontSize: fontSize.M,
      lineHeight: 1.5,
      fontWeight: 700,
    },
    // h3
    h3: {
      fontSize: fontSize.S,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h3Bold: {
      fontSize: fontSize.S,
      lineHeight: 1.5,
      fontWeight: 700,
    },
    // Body/Caption
    body1: {
      fontSize: fontSize.XS,
    },
    body1Bold: {
      fontSize: fontSize.XS,
      fontWeight: 700,
    },
    body1Underline: {
      fontSize: fontSize.XS,
      textDecoration: 'underline',
    },
    body2: {
      fontSize: fontSize.XXS,
    },
    body2Bold: {
      fontSize: fontSize.XXS,
      fontWeight: 700,
    },
    body2Underline: {
      fontSize: fontSize.XXS,
      textDecoration: 'underline',
    },
    caption: {
      fontSize: fontSize.XXS,
    },
    captionBold: {
      fontSize: fontSize.XXS,
      fontWeight: 700,
    },
    button: {
      fontSize: fontSize.XS,
    },
    // その他
    totalPrice: {
      fontSize: fontSize.LLL,
      fontWeight: 'bold',
    },
    sideMenu: {
      fontSize: fontSize.XXXS,
    },
    sideMenuBold: {
      fontSize: fontSize.XXXS,
    },
    dashboardTitle: {
      fontSize: fontSize.XS,
    },
    tableHead: {
      fontSize: fontSize.XXS,
      fontWeight: 700,
    },
    tableBody: {
      fontSize: fontSize.XXS,
    },
    tab: {
      fontSize: fontSize.XS,
    },
    tabBold: {
      fontSize: fontSize.XS,
      fontWeight: 700,
    },
    bottomNavigation: {
      fontSize: fontSize.XXXS,
    },
    // 未整理
    dialogTitle: {
      fontSize: fontSize.M,
      fontWeight: 300,
    },
    dialogBody: {
      fontSize: fontSize.XS,
    },
    link: {
      display: 'inline',
      textDecoration: 'underline',
      color: blue[500],
    },
    snackbar: {
      // TODO: 定義にないフォントサイズのため、暫定的に設定 デザイン側と話す / 使っていないvariantを整理する
      // https://88-oct.atlassian.net/browse/APCCUS-3028
      fontSize: 16,
      color: grey[0],
    },
    bodySp: {
      fontSize: fontSize.S,
      lineHeight: 1.5,
      fontWeight: 400,
    },
  },
  palette: {
    background: {
      default: grey[0],
    },
    error: {
      main: red[900],
    },
    primary: {
      main: blue[500],
      contrastText: grey[0],
    },
    secondary: {
      main: green[900],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: grey[0],
          '& label': {
            color: grey[400],
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          wordBreak: 'break-all',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: 'break-all',
        },
      },
      defaultProps: {
        variantMapping: {
          h1Bold: 'h1',
          h2Bold: 'h2',
          h3Bold: 'h3',
          // Body/Caption
          body1Bold: 'p',
          body1Underline: 'p',
          body2Bold: 'p',
          body2Underline: 'p',
          captionBold: 'p',
          // その他
          sideMenu: 'span',
          sideMenuBold: 'span',
          dashboardTitle: 'span',
          tableHead: 'span',
          tableBody: 'span',
          tab: 'span',
          tabBold: 'span',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          // https://stackoverflow.com/questions/17233804/how-to-prevent-sticky-hover-effects-for-buttons-on-touch-devices
          // touch deviceにてタッチ後にhover状態が解除されず背景色が残ってしまうのでhover状態の色をgrey[0]で上書き
          // @media (hover: none) の箇所のみ適応
          '@media (hover: none)': {
            '&:hover': {
              backgroundColor: grey[0],
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: grey[0],
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          backgroundColor: grey[0],
        },
      },
    },
  },
});

const theme = createTheme(initialTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          color: grey[0],
          '@media (hover: none)': {
            // 背景色がhover時の色に上書きされgrey[0]になってしまうのでdisabledをデフォルトカラーで上書き
            '&:disabled': {
              backgroundColor: initialTheme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  },
});

// see https://mui.com/customization/typography/
declare module '@mui/material/styles' {
  interface TypographyVariants {
    // 未整理
    dialogTitle: React.CSSProperties;
    dialogBody: React.CSSProperties;
    link: React.CSSProperties;
    snackbar: React.CSSProperties;

    // Header
    h1Bold: React.CSSProperties;
    h2Bold: React.CSSProperties;
    h3Bold: React.CSSProperties;
    // Body/Caption
    body1Bold: React.CSSProperties;
    body1Underline: React.CSSProperties;
    body2Bold: React.CSSProperties;
    body2Underline: React.CSSProperties;
    captionBold: React.CSSProperties;
    // その他
    sideMenu: React.CSSProperties;
    sideMenuBold: React.CSSProperties;
    dashboardTitle: React.CSSProperties;
    tableHead: React.CSSProperties;
    tableBody: React.CSSProperties;
    tab: React.CSSProperties;
    tabBold: React.CSSProperties;
    bottomNavigation: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // 未整理
    dialogTitle?: React.CSSProperties;
    dialogBody?: React.CSSProperties;
    link?: React.CSSProperties;
    snackbar?: React.CSSProperties;

    // Header
    h1Bold?: React.CSSProperties;
    h2Bold?: React.CSSProperties;
    h3Bold?: React.CSSProperties;
    // Body/Caption
    body1Bold?: React.CSSProperties;
    body1Underline?: React.CSSProperties;
    body2Bold?: React.CSSProperties;
    body2Underline?: React.CSSProperties;
    captionBold?: React.CSSProperties;
    // その他
    totalPrice?: React.CSSProperties;
    sideMenu?: React.CSSProperties;
    sideMenuBold?: React.CSSProperties;
    dashboardTitle?: React.CSSProperties;
    tableHead?: React.CSSProperties;
    tableBody?: React.CSSProperties;
    tab?: React.CSSProperties;
    tabBold?: React.CSSProperties;
    bottomNavigation?: React.CSSProperties;
    bodySp?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // 未整理
    dialogTitle: true;
    dialogBody: true;
    link: true;
    snackbar: true;

    // Header
    h1Bold: true;
    h2Bold: true;
    h3Bold: true;
    // Body/Caption
    body1Bold: true;
    body1Underline: true;
    body2Bold: true;
    body2Underline: true;
    captionBold: true;
    // その他
    totalPrice: true;
    sideMenu: true;
    sideMenuBold: true;
    dashboardTitle: true;
    tableHead: true;
    tableBody: true;
    tab: true;
    tabBold: true;
    bottomNavigation: true;
    bodySp: true;
  }
}

export default theme;

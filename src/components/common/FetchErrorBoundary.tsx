'use client';

import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  inline?: boolean;
} & typeof FetchErrorBoundary.defaultProps;

type State = {
  hasError: boolean;
};

class FetchErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static defaultProps = {
    inline: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ err: error, errorInfo }, 'Caught a error when fetching');
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? <FetchErrorFallback inline={this.props.inline} />
      );
    }

    return this.props.children;
  }
}

export default FetchErrorBoundary;

const FetchErrorFallback: React.FC<{ inline: boolean }> = ({ inline }) => {
  if (inline) {
    return (
      <Typography
        variant="body2"
        align="left"
        display="inline"
        component="span"
        color={grey[700]}
      >
        読み込みに失敗しました
      </Typography>
    );
  }
  return (
    // NOTE: Dialogの直下位にあるCardに影を自動につけるので、Boxに変更する
    <Box
      aria-label="このコンテンツの取得に失敗しました"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        boxSizing: 'border-box',
        padding: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="body2" textAlign="center" color={grey[700]}>
        読み込みに失敗しました
      </Typography>
    </Box>
  );
};

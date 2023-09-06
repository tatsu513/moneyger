import { Skeleton } from '@mui/material';

type InlineLoadingProps = {
  width?: number | string;
  height: number | string;
};

const InlineLoading: React.FC<InlineLoadingProps> = ({
  width = '100%',
  height,
}) => <Skeleton variant="rounded" width={width} height={height} />;

export default InlineLoading;

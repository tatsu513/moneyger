import {
  DataGrid,
  DataGridProps,
  GridCellParams,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowParams,
  GridRowsProp,
  GridSlotsComponent,
  GridValidRowModel,
  MuiEvent,
} from '@mui/x-data-grid';
import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DATA_GRID = {
  PAGE_SIZE: 20,
  HEADER_HEIGHT: 40,
  ROW_HEIGHT: 40,
} as const satisfies Record<string, number>;

type Props<T extends GridValidRowModel> = Omit<
  DataGridProps,
  | 'isRowSelectable'
  | 'components'
  | 'rows'
  | 'columns'
  | 'onRowClick'
  | 'onCellClick'
> & {
  noRowsMessage?: string;
  isDisabledSelectAllCheckbox?: boolean;
  isRowSelectable?: (params: GridRowParams<T>) => boolean;
  components?: Partial<
    Omit<GridSlotsComponent, 'NoRowsOverlay' | 'BaseCheckbox'>
  >;
  initialSortModel?: NonNullable<
    NonNullable<DataGridProps['initialState']>['sorting']
  >['sortModel'];
  clickable?: boolean;
  rows: GridRowsProp<T>;
  columns: GridColDef<T>[];
  onRowClick?: (
    params: GridRowParams<T>,
    event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>,
  ) => void;
  onCellClick?: (
    params: GridCellParams<T>,
    event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>,
  ) => void;
  columnVisibilityModel?: GridColumnVisibilityModel;
};

const containerStyles = () => ({
  '&.MuiDataGrid-root': {
    '& .MuiDataGrid-columnHeaderWrapper': {
      // backgroundColor: grey[50],
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-row:hover': {
      cursor: 'pointer',
    },
    '& .MuiDataGrid-cell': {
      '&:focus-within': {
        outline: 'none',
      },
    },
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 'bold',
      // backgroundColor: grey[50],
      '&:focus-within': {
        outline: 'none',
      },
    },
  },
});

const MoneygerDatagrid = <T extends GridValidRowModel>({
  initialSortModel,
  columnVisibilityModel,
  ...props
}: Props<T>) => {
  const dataGridStyles = useMemo(() => containerStyles(), []);
  return (
    <DataGrid
      {...props}
      initialState={{
        sorting: {
          sortModel: initialSortModel,
        },
        pagination: { paginationModel: { pageSize: DATA_GRID.PAGE_SIZE } },
      }}
      sx={dataGridStyles}
      autoHeight
      disableRowSelectionOnClick
      disableColumnMenu
      pageSizeOptions={[DATA_GRID.PAGE_SIZE]}
      rowHeight={DATA_GRID.ROW_HEIGHT}
      columnHeaderHeight={DATA_GRID.HEADER_HEIGHT}
      rowCount={props.rowCount}
      columnVisibilityModel={columnVisibilityModel}
    />
  );
};

export default MoneygerDatagrid;
